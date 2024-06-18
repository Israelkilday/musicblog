import styles from "./Home.module.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { IoIosSearch } from "react-icons/io";

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const { documents: posts, loading } = useFetchDocuments({
    docCollection: "posts",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <main className={styles.home}>
      <div className={styles.navbar}>
        <Navbar />
      </div>

      <section className={styles.header_home}>
        <div>
          <h1 className={styles.title_header}>Bem vindo ao Music Blog</h1>

          <p className={styles.p_header_home}>
            Sua voz importa! Este é o lugar para compartilhar suas experiências
            musicais, desde memórias de shows inesquecíveis até descobertas de
            artistas promissores. Sinta-se à vontade para expressar sua paixão
            pela música!
          </p>

          <div className={styles.header_icons}>
            <NavLink to="https://www.linkedin.com/in/israeldevfrontend">
              <FaLinkedin className={styles.linkedin} />
            </NavLink>

            <NavLink to="https://github.com/Israelkilday">
              <FaGithub className={styles.github} />
            </NavLink>

            <NavLink to="https://www.instagram.com/israelkilday/">
              <FaInstagram className={styles.instagram} />
            </NavLink>

            <a href="mailto:israel.kilday@yahoo.com.br">
              <MdEmail className={styles.email} />
            </a>
          </div>
        </div>
      </section>

      <section className={styles.search_session}>
        <h2>Veja os nossos posts mais recents!</h2>

        <form onSubmit={handleSubmit} className={styles.search_form}>
          <input
            type="text"
            required
            placeholder="Ou busque por tags..."
            onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
          />
          <button className={styles.button_icon}>
            <IoIosSearch className={styles.search_icon} />
          </button>
        </form>
      </section>

      <section className={styles.grid_posts}>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}

        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
