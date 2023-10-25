// FIREBASE
import { db } from "../firebase/config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"
// HOOKS
import { useState, useEffect } from "react";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfCancelled() {
        if (cancelled) {
            return;
        };
    }

    // REGISTER
    const createUser = async (data) => {
        checkIfCancelled();
        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false);

            return (user)

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)


            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa  conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu erro, por favor tente mais tarde."
            }

            setLoading(false);
            setError(systemErrorMessage);
        };
    };

    // LOGOUT -SIGN OUT
    const logout = () => {
        checkIfCancelled();
        signOut(auth);
    }

    // LOGIN - SIGN IN
    const login = async (data) => {
        checkIfCancelled();
     
        setLoading(true);
        setError(false);
     
        try {
          await signInWithEmailAndPassword(auth, data.email, data.password);
          setLoading(false);
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);
            console.log(error.message.includes("user-not"));

          let systemErrorMessage;
          console.log(error);      //sugestão do professor

        //   if (error.message.includes("user-not-found")) {
          if (error.message.includes("invalid-login-credentials")) { //mensagem de erro correta para exebir este erro 
            systemErrorMessage = "Usuário não encontrado";
          } else if (error.message.includes("wrong-password")) {
            systemErrorMessage = "Senha incorreta";
          } else {
            systemErrorMessage = "Ocorreu um erro, por favor, tente mais tarde.";
          }
     
          setError(systemErrorMessage);
          setLoading(false);
        }
      };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };
};



