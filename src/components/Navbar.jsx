// CSS 
import styles from "./Navbar.module.css";
// REACT ROUTER DOM
import { NavLink } from "react-router-dom";
// HOOKS
import { useAuthentication } from "../hooks/useAuthentication";
import { useAnimationMenu } from "../hooks/useAnimationMenu";
// CONTEXT
import { userAuthValue } from "../context/AuthContext";

const Navbar = () => {
    const { user } = userAuthValue();

    const { logout } = useAuthentication();

    const { handleClickButton, handleLinkClick, showMenu } = useAnimationMenu();

    return (
        <header className={styles.header}>
            <NavLink to="/" className={styles.brand}>
                Mini <span>Blog</span>
            </NavLink>

            <nav className={styles.navbar}>
                <ul className={`${styles.links_list} ${showMenu ? styles.active : ""}`}>
                    <li
                        onClick={handleLinkClick}
                        className={`${styles.active_menu}
                                    ${showMenu ? styles.animation_menu : ""}`}
                        style={{ "--i": 0 }}
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
                                            ${showMenu ? styles.animation_menu : ""}`}
                                style={{ "--i": 1 }}
                            >
                                <NavLink to="/login"
                                    className={({ isActive }) => (isActive ? styles.active : "")}
                                >
                                    Entrar
                                </NavLink>
                            </li>

                            <li onClick={handleLinkClick}
                                className={`${styles.active_menu}
                                            ${showMenu ? styles.animation_menu : ""}`}
                                style={{ "--i": 2 }}
                            >
                                <NavLink to="/register"
                                    className={({ isActive }) => (isActive ? styles.active : "")}
                                >
                                    Cadastrar
                                </NavLink>
                            </li>
                        </>
                    )}

                    {user && (
                        <>
                            <li onClick={handleLinkClick}
                                className={`${styles.active_menu}
                                            ${showMenu ? styles.animation_menu : ""}`}
                                style={{ "--i": 1 }}
                            >
                                <NavLink to="/posts/create"
                                    className={({ isActive }) => (isActive ? styles.active : "")}
                                >
                                    Novo Post
                                </NavLink>
                            </li>

                            <li onClick={handleLinkClick}
                                className={`${styles.active_menu}
                                            ${showMenu ? styles.animation_menu : ""}`}
                                style={{ "--i": 2 }}
                            >
                                <NavLink to="/dashboard"
                                    className={({ isActive }) => (isActive ? styles.active : "")}
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        </>
                    )}

                    <li onClick={handleLinkClick}
                        className={`${styles.active_menu}
                                    ${showMenu ? styles.animation_menu : ""}`}
                        style={{ "--i": 3 }}
                    >
                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                            Sobre
                        </NavLink>
                    </li>

                    {user && (
                        <li className={`${styles.active_menu}
                            ${showMenu ? styles.animation_menu : ""}`}
                            style={{ "--i": 4 }}
                        >
                            <button onClick={logout}>Sair</button>
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