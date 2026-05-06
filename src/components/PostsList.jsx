import { useEffect, useState } from "react";
import "./PostsList.css";

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPosts = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );

            if (!response.ok) {
                throw new Error("Błąd podczas pobierania danych");
            }

            const data = await response.json();

            // tylko pierwsze 10 postów
            setPosts(data.slice(0, 10));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <section className="posts-section">
            <div className="posts-container">
                <div className="posts-header">
                    <div>
                        <h1>Lista postów</h1>
                        <p>Pobieranie danych z API w React</p>
                    </div>

                    <button className="reload-btn" onClick={fetchPosts}>
                        Pobierz ponownie
                    </button>
                </div>

                {loading && (
                    <p className="info-message">Ładowanie danych...</p>
                )}

                {error && (
                    <p className="error-message">{error}</p>
                )}

                {!loading && !error && (
                    <div className="posts-list">
                        {posts.map((post) => (
                            <div key={post.id} className="post-card">
                                <h3>
                                    {post.id}. {post.title}
                                </h3>
                                <p>{post.body}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default PostsList;