// CSS 
import styles from "./PostDetail.module.CSS"
// REACT-ROUTER-DOM
import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.created_by}>{post.createdBy}</p>
      
      <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn_outline">
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;