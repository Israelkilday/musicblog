// CSS
import styles from "./Home.module.css";
// REACT ROUTER DOM
import { Link, useNavigate } from "react-router-dom";
// HOOKS
import { useState } from "react";
// COMPONENTS

const Home = () => {
  const [query, setQuery] = useState("");
  const [posts] = useState([]);

  const handlSubmit = (e) => {
    e.prventDefault();
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recents</h1>

      <form onSubmit={handlSubmit} className={styles.search_form}>
        <input type="text" placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>

      <div>
        <h1>Posts...</h1>

        {posts && posts.length === 0 &&(
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

export default Home