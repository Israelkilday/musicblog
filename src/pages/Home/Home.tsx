// CSS
import styles from "./Home.module.css";
// REACT ROUTER DOM
import { Link, useNavigate } from "react-router-dom";
// HOOKS
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
// COMPONENTS
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const { documents: posts, loading } = useFetchDocuments({docCollection: "posts"});

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  }
  console.log("Posts:", posts);
  console.log("Loading:", loading);

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recents!</h1>

      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          required
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
        />
        <button className="btn btn_dark">Pesquisar</button>
      </form>
      
      <div>
        {loading && <p>Carregando...</p> }
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}

        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;



