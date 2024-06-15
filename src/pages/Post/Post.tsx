import styles from "./Post.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import Navbar from "../../components/Navbar";
import { IoChevronBackCircle } from "react-icons/io5";

const Post = () => {
  const { id } = useParams();

  const { document: post, loading } = useFetchDocument("posts", id || "");

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      {loading && <p className={styles.post_load}>Carregando Post...</p>}
      <div className={styles.navbar}>
        <Navbar />
      </div>

      {post && (
        <section className={styles.post_container}>
          <div className={styles.image}>
            <img src={post.image} alt={post.title} />

            <button onClick={handleBackClick}>
              <IoChevronBackCircle className={styles.button_back} />
            </button>
          </div>

          <h3>Este post trata sobre:</h3>

          <div className={styles.tags}>
            {post.tagsArray.map((tag: string) => (
              <p key={tag} className={styles.tags_p}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>

          <h1>{post.title}</h1>

          <p style={{ padding: "0 2em" }}>{post.body}</p>
        </section>
      )}
    </>
  );
};

export default Post;
