// FIREBASE
// import { db } from "../firebase/config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth"
// HOOKS
import { useState, useEffect } from "react";

// interface User {
//     uid: string;
//     dispalyName: string;
// }

export const useAuthentication = () => {
    const [error, setError] = useState<string | null>(null);
    
    type LoadingState = null | boolean;
    const [loading, setLoading] = useState<LoadingState>(null);

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfCancelled() {
        if (cancelled) {
            return;
        };
    }

    interface UserData {
        email: string;
        password: string;
        displayName?: string
        uid: string;
    }

    // REGISTER
    const createUser = async (data: UserData) => {
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

            // setLoading(false);
            setLoading(null);

            return (user)

        } catch (error: any | string) {
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

            // setLoading(false);
            setLoading(null);
            setError(systemErrorMessage);
            
        };
    };

    // LOGOUT -SIGN OUT
    const logout = (): void => {
        checkIfCancelled();
        signOut(auth);
    }

    // LOGIN - SIGN IN
    const login = async (data: UserData): Promise<void> => {
        checkIfCancelled();
     
        setLoading(true);
        // setError(false);
        setError(null);
     
        try {
          await signInWithEmailAndPassword(auth, data.email, data.password);
        //   setLoading(false);
          setLoading(null);
           
        } catch (error: any | string) {
            console.log(error.message);
            console.log(typeof error.message);
            console.log(error.message.includes("user-not"));

          let systemErrorMessage;
          console.log(error);      

          if (error.message.includes("auth/invalid-credential")) { 
            systemErrorMessage = "Usuário ou senha estão incorretos";

          } else if (error.message.includes("auth/too-many-requests")) {
            systemErrorMessage = "Varias tentativas de login malsucedidas. Por favor, tente novamente mais tarde"

          } else {
            systemErrorMessage = "Ocorreu um erro, por favor, tente mais tarde.";
          }
     
          setError(systemErrorMessage);
        //   setLoading(false);
          setLoading(null);
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



