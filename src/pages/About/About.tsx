// REACT ROUTER DOM
import styles from "./About.module.css";
// CSS
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className={styles.about}>
            <h2>Sobre o Music <span>Blog</span></h2>

            <div className={styles.about_content}>
                <p>
                    Este é um projeto pessoal, uma aplicação web construída com React, integrada ao Firebase para criar, editar e visualizar Posts.
                    O objetivo é criar Posts falando de música em geral, aproveitei para iniciar o Blog postando sobre algumas de minhas bandas favoritas, mais sinta-se a vontade para postar sobre qualquer estilo musical.
                    Para facilitar o acesso faça login com o usuário: <span className={styles.italic}>usuarioTeste@email.com</span>, senha: <span className={styles.italic}>123456</span> Assim poderá ter acesso ao Dashboard. Quando escolher uma imagem para criar um Post, clique nela com o botão direito e copie seu endereço para que seja uma URL valida, <br/>Obrigado pela visita!
                </p>
            </div>
            <Link to="/posts/create" className="btn">Criar Post</Link>
        </div>
    );
};

export default About;