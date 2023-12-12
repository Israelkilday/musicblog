// CSS
import styles from "./Register.module.css"
// HOOKS
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

// interface User {
//     uid: string;
//     displayName: string;
// }

const Register = () => {
    const [displayName, setDisplayName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    const { createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("");

        const user = {
            displayName,
            email,
            password
        }

        if (password !== confirmPassword) {
            setError("As senhas precisam ser iguais!")
            return
        }

        const res = await createUser(user)

        console.log(res);
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className={styles.register}>
            <h1>Cadastre-se para postar</h1>
            <p>Crie seu usúario e compartilhe suas histórias</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input type="text"
                        name="displayName"
                        required
                        placeholder="Nome do usúario"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                    />
                </label>

                <label>
                    <span>E-mail:</span>
                    <input
                        type="email"
                        name="email"
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
                        required
                        placeholder="Insira sua senha"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>

                <label>
                    <span>Confirmaçaõ de senha:</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Confirme sua senha"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                </label>

                {!loading && <button className="btn">Cadastrar</button>}

                {loading && (
                    <button className="btn" disabled>
                        Aguarde...
                    </button>
                )}

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

export default Register;