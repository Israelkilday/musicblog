import styles from "./Search.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Search = () => {
  const [params] = useSearchParams();
  const search = params.get("q");

  const { documents: posts, loading } = useFetchDocuments({
    docCollection: "posts",
    search,
  });

  return (
    <div className={styles.section_container}>
      <div>
        <Navbar />
      </div>

      <h2>
        Resultado para:<span className={styles.search}> {search}</span>
      </h2>

      <section className={styles.grid_posts}>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}

        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontardos posts apartir da sua busca...</p>

            <Link to="/" className="btn btn_dark">
              Voltar
            </Link>
          </div>
        )}
      </section>
      {/* <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p className={styles.p_search}>
              Não foram encontardos posts apartir da sua busca...
            </p>
            <Link to="/" className="btn btn_dark">
              Voltar
            </Link>
          </div>
        )}

        <div className={styles.search_post}>
          {posts &&
            posts.map((post) => <PostDetail key={post.id} post={post} />)}
        </div>
      </div> */}
    </div>
  );
};

export default Search;
