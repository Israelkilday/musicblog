import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAnimationMenu } from "../hooks/useAnimationMenu";
import { userAuthValue } from "../context/AuthContext";
import { HiMiniPlayPause } from "react-icons/hi2";

const Navbar = () => {
  const { user } = userAuthValue();

  const { logout } = useAuthentication();

  const { handleClickButton, handleLinkClick, showMenu } = useAnimationMenu();

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.brand}>
        <HiMiniPlayPause className={styles.icon} />
        Music <span>Blog</span>
        <HiMiniPlayPause className={styles.icon2} />
      </NavLink>

      <nav>
        <ul className={`${styles.links_list} ${showMenu ? styles.active : ""}`}>
          <li
            onClick={handleLinkClick}
            className={`${styles.active_menu}
                                    ${showMenu ? styles.animation_menu : ""}`}
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Home
            </NavLink>
          </li>

          {!user && (
            <>
              <li
                onClick={handleLinkClick}
                className={`${styles.active_menu}
                                            ${
                                              showMenu
                                                ? styles.animation_menu
                                                : ""
                                            }`}
                style={{ "--i": 1 } as React.CSSProperties}
              >
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Entrar
                </NavLink>
              </li>

              <li
                onClick={handleLinkClick}
                className={`${styles.active_menu}
                                            ${
                                              showMenu
                                                ? styles.animation_menu
                                                : ""
                                            }`}
                style={{ "--i": 2 } as React.CSSProperties}
              >
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Cadastrar
                </NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li
                onClick={handleLinkClick}
                className={`${styles.active_menu}
                                            ${
                                              showMenu
                                                ? styles.animation_menu
                                                : ""
                                            }`}
                style={{ "--i": 1 } as React.CSSProperties}
              >
                <NavLink
                  to="/posts/create"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Novo Post
                </NavLink>
              </li>

              <li
                onClick={handleLinkClick}
                className={`${styles.active_menu}
                                            ${
                                              showMenu
                                                ? styles.animation_menu
                                                : ""
                                            }`}
                style={{ "--i": 2 } as React.CSSProperties}
              >
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Dashboard
                </NavLink>
              </li>
            </>
          )}

          <li
            onClick={handleLinkClick}
            className={`${styles.active_menu}
                                    ${showMenu ? styles.animation_menu : ""}`}
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Sobre
            </NavLink>
          </li>

          {user && (
            <li
              className={`${styles.active_menu}
                            ${showMenu ? styles.animation_menu : ""}`}
              style={{ "--i": 4 } as React.CSSProperties}
            >
              <button className={styles.logout} onClick={logout}>
                Sair
              </button>
            </li>
          )}
        </ul>
      </nav>

      <button
        onClick={handleClickButton}
        className={`${styles.btn_menu}
                ${showMenu ? styles.active : ""}`}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
    </header>
  );
};

export default Navbar;
