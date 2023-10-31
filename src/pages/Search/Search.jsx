// CSS
import styles from "./Search.module.css"
// HOOKS 
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
// COMPONENTS
import PostDetail from "../../components/PostDetail";
// REACT-ROUTER-DOM
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search)

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontardos posts apartir da sua busca...</p>
            <Link to="/" className="btn btn_dark">
              Voltar
            </Link>
          </div>
        )}
        
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)};
      </div>
    </div>
  );
};

export default Search;