// REACT ROUTER DOM
import styles from "./About.module.css"; 
// CSS
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className={styles.about}>
            <h2>Sobre o Music<span>Blog</span></h2>
            <p>
                Este projeto consiste em um Blog feito com React no Front-End e Firebase no Back-End.
                O objetivo é criar POSTS falando de música, em geral, aproveitei para iniciar o Blog postando sobre algumas de minhas bandas favoritas, mais sinta-se a vontade para postar sobre qualquer estilo musical.
                Para facilitar o acesso faça login com o usuário: <span className={styles.italic}>usuarioTeste@.com</span>, senha: <span className={styles.italic}>123456</span> Assim poderá ter acesso ao Dashboard, <br/>Obrigado pela visita!       
            </p>
            <Link to="/posts/create" className="btn">Criar Post</Link>
        </div>
    );
};

export default About;