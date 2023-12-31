// CSS
import styles from "./Post.module.css"
// REACT-ROUTER-DOM
import { useParams } from "react-router-dom"
// HOOKS
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id || "")

    return (
        <div className={styles.post_container}>
            {loading && <p className={styles.post_load}>Carregando Post...</p>}

            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} />
                    <p style={{padding: "0 2em"}}>{post.body}</p>
                    <h3>Este post trata sobre:</h3>

                    <div className={styles.tags}>
                        {post.tagsArray.map((tag: string) => (
                            <p key={tag} className={styles.tags_p}><span>#</span>{tag}</p>
                        ))}
                    </div>
                </> 
            )}
        </div>
    );
};

export default Post;