// CSS
import styles from "./Footer.module.css"
// REACT ROUTER DOM
import { NavLink } from "react-router-dom";
// REACT ICONS
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaInstagram, FaArrowUp, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiMiniPlayPause } from "react-icons/hi2";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.h3_footer}>ESCREVA SOBRE A SUA BANDA FAVORITA!</h3>
      <div className={styles.box_footer}>
        <div className={styles.box_footer_icons} >

          <NavLink to="/" className={styles.brand}>
            <HiMiniPlayPause className={styles.icon} />
            Music <span>Blog</span>
            <HiMiniPlayPause className={styles.icon2} />
          </NavLink>

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

        <div >
          <h3>INSTITUCIONAL</h3>
          <p>FAQs</p>
          <p>Sobre o MusicBlog</p>
          <p>Política de segurança e privacidade</p>
        </div>

        <div >
          <h3>DEPARTAMENTOS</h3>
          <p>Forums</p>
          <p>Afiliados</p>
          <p>Newsletter</p>
        </div>

        <div>
          <h3>CONTATO</h3>
          <p className={styles.p_icon}>
            <FaWhatsapp className={styles.icon} />
            (85) 912345678
          </p>
          <p className={styles.p_icon}>
            <FaPhoneAlt className={styles.icon_phone} />
            SAC 0800 1234 5678
          </p>
          <p>www.MusicBLOG@email.com</p>
        </div>
      </div>

      <div className={styles.end_footer}>
        <p className={styles.p_end_footer}>&copy; 2023 ISRAEL KILDAY<br/> Todos os direitos reservados</p>

        <div onClick={scrollToTop} className={styles.arrow_up}>
          <FaArrowUp />
        </div>
      </div>
    </footer>
  );
};

export default Footer;