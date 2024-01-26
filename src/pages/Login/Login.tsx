// CSS
import styles from "./Login.module.css"
// HOOKS
import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
// REACT ICONS
import { FaUserCircle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("");

    const user = {
      email,
      password
    }

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <FaUserCircle className={styles.icon_user} />

      <h1>Login</h1>

      <p>Faça o login para poder ultilizar o sistema</p>
      
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            autoComplete="on"
            required
            placeholder="E-mail do usúario"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            autoComplete="on"
            required
            placeholder="Insira sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;


