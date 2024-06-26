import styles from "./CreatePost.module.css";
import { useState, useEffect } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { userAuthValue } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [formError, setFormError] = useState<string | null>("");

  const { user } = userAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormError("Por favor preencha todos os campos!");
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user?.uid || "",
      createdBy: user?.displayName || "",
    });

    navigate("/");
  };

  return (
    <section>
      <div className={styles.navbar}>
        <Navbar />
      </div>

      <div className={styles.create_post}>
        <h2>Criar Post</h2>
        <p>
          Escreva e compartilhe sobre sua banda, artista ou musica favorita!
        </p>

        <form className={styles.search_form} onSubmit={handleSubmit}>
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
              placeholder="Insira o endereço da imagem que representa o seu post"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </label>

          <label>
            <span>Conteúdo</span>
            <textarea
              name="body"
              required
              placeholder="Insira o conteúdo do post"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            ></textarea>
          </label>

          <label>
            <span>Tags</span>
            <input
              type="text"
              name="tags"
              placeholder="Insira as tags separados por vírgula"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
            />
          </label>

          {!response.loading && <button className="btn">Criar Post!</button>}

          {response.loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}

          {(response.error || formError) && (
            <p className="error">{response.error || formError}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
