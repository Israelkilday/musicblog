// CSS 
import styles from "./Navbar.module.css";
// REACT ROUTER DOM
import { NavLink } from "react-router-dom";
// HOOKS
import { useAuthentication } from "../hooks/useAuthentication";
// CONTEXT
import { userAuthValue } from "../context/AuthContext";

const Navbar = () => {
    const { user } = userAuthValue();

    const { logout } = useAuthentication();

    return (
        <header className={styles.header}>
            <NavLink to="/" className={styles.brand}>
                Mini <span>Blog</span>
            </NavLink>

            <nav className={styles.navbar}>
                <ul className={styles.links_list}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                            Home
                        </NavLink>
                    </li>

                    {!user && (
                        <>
                            <li>
                                <NavLink to="/login"
                                    className={({ isActive }) => (isActive ? styles.active : "")}
                                >Entrar
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/register"
                                    className={({ isActive }) => (isActive ? styles.active : "")}
                                >Cadastrar
                                </NavLink>
                            </li>
                        </>
                    )}

                    {user && (
                        <>
                            <li>
                                <NavLink to="/posts/create"
                                    className={({ isActive }) => (isActive ? styles.active : "")}
                                >Novo Post
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard"
                                    className={({ isActive }) => (isActive ? styles.active : "")}
                                >Dashboard
                                </NavLink>
                            </li>
                        </>
                    )}

                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? styles.active : "")}
                        >
                            Sobre
                        </NavLink>
                    </li>

                    {user && (
                        <li>
                            <button onClick={logout}> Sair</button>
                        </li>
                    )}
                </ul>
            </nav>

            <button id="menu_icon" className={styles.btn_menu}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>
        </header>
    );
};

export default Navbar;