// CSS
import styles from "./EditPost.module.css"
// HOOKS
import { useEffect, useState } from "react";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
// REACT-ROUTER-DOM
import { useNavigate, useParams } from "react-router-dom";
// CONTEXT
import { userAuthValue } from "../../context/AuthContext";

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const textTags = post.tagsArray.join(", ");
            setTags(textTags);
        }
    }, [post]);


    const { user } = userAuthValue();

    const { updateDocument, response } = useUpdateDocument("posts");

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        // validate image URL
        try {
            new URL(image);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL.");
        }

        // criar  user.uid array de tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        // checar toodos os valores
        if (!title || !image || !tags || !body) {
            setFormError("Por favor preencha todos os campos!");
        }

        if (formError) return;

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        }
        
        updateDocument(id, data);
        
        // redirect to home page
        navigate("/dashboard");
    }

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editando  Post: {post.title}</h2>
                    <p>Altere os dados do post como desejar</p>

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
                                placeholder="Insira a imagem que representa o seu post"
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />
                        </label>

                        <p className={styles.preview_title}>Preview da imagem atual:</p>
                        <img
                            className={styles.image_preview}
                            src={post.image}
                            alt={post.title}
                        />

                        <label>
                            <span>Conteúdo</span>
                            <textarea
                                name="body"
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
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                            />
                        </label>

                        {!response.loading && <button className="btn">Editar</button>}

                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde...
                            </button>
                        )}

                        {(response.error || formError) && (
                            <p className="error">{response.error || formError}</p>
                        )}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost;