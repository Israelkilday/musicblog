// CSS
import styles from "./Search.module.css"
// HOOKS 
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
// COMPONENTS
import PostDetail from "../../components/PostDetail";
// REACT-ROUTER-DOM
import { Link, useSearchParams } from "react-router-dom";

const Search = () => {

  const [params] = useSearchParams();
  const search = params.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h2>Resultado para: <span className={styles.search}>{search}</span></h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
           <p className={styles.p_search}>Não foram encontardos posts apartir da sua busca...</p>
            <Link to="/" className="btn btn_dark">
              Voltar
            </Link>
          </div>
        )}
        
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;


