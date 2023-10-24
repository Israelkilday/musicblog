// CSS
import styles from "./CreatePost.module.css"
// HOOKS
import { useState } from "react";
// REACT-ROUTER-DOM
import { Navigate } from "react-router-dom";
// cONTEXT
import { useaAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, Settags] = useState("");
  const [formError, setFormError] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  
  return (
    <div className={styles.create_post}>
      <h2>Createpost</h2>
      <p>Escreva o que quiser e compartilhe seu conhecimento!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título</span>
          <input
            type="text"
            name="title"
            placeholder="Pense em um bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>URL da imagem</span>
          <input
            type="text"
            name="image"
            placeholder="Insira uma imagem que representa o seu post"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Conteúdo</span>
          <textarea
            name=""
            required
            placeholder="Insira o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          >
          </textarea>
        </label>

        <label>
          <span>Tags</span>
          <input
            type="text"
            name="tags"
            placeholder="Insira as tags separados por vírgula"
            onChange={(e) => setTitle(e.target.value)}
            value={tags}
          />
        </label>

        <button className="btn">Cadastrar</button>
        {/* {!loading && <button className="btn">Cadastrar</button>}

                {loading && (
                    <button className="btn" disabled>
                        Aguarde...
                    </button>
                )}

                {error && <p className="error">{error}</p>} */}
      </form>
    </div>
  )
}

export default CreatePost;