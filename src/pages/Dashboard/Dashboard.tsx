// CSS
import styles from "./Dashboard.module.css"
// REACT-ROUTER-DOM
import { Link } from "react-router-dom"
// CONTEXT
import { userAuthValue } from "../../context/AuthContext";
// HOOKS
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { user} = userAuthValue();

  const uid = user?.uid

  const { documents: posts, loading } = useFetchDocuments({docCollection: "posts", search: null, uid});

  const { deleteDocument } = useDeleteDocument("posts");

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus Posts</p>

      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>

          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                  <p>{post.title}</p>

                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn_outline">
                    Ver
                  </Link>

                  <Link to={`/posts/edit/${post.id}`} className="btn btn_outline">
                    Editar
                  </Link>

                  <button onClick={() => deleteDocument(post.id)}
                    // className="btn btn_outline btn_danger"
                    className={styles.btn_danger}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;