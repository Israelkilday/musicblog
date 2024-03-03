// CSS
import styles from "./Footer.module.css"
// REACT ROUTER DOM
import { NavLink } from "react-router-dom";
// REACT ICONS
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>Escreva sobre sua banda favorita!</h3>

      <div className={styles.box_footer_icons} >
          
        
        <div className={styles.footer_icons}>
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

      <p>Criado por Israel Kilday &copy; 2023</p>
    </footer>
  );
};

export default Footer;