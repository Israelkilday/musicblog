// CSS 
import styles from "./PostDetail.module.css"
// REACT-ROUTER-DOM
import { Link } from "react-router-dom";

interface PostDetailProps {
  post: {
    id: string;
    title: string;
    image: string;
    createdBy: string;
    tagsArray: string[];
  };
};

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <div className={styles.post_box}>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className={styles.created_by}>por: {post.createdBy}</p>

        <div className={styles.tags}>
          {post.tagsArray.map((tag) => (
            <p key={tag}>
              <span>#</span>
              {tag}
            </p>
          ))}
        </div>
        
          <Link to={`/posts/${post.id}`} className="btn btn_outline">
            Visualizar
          </Link>
      </div>
    </div>
  );
};

export default PostDetail;