import { useContext, createContext, ReactNode } from "react";

// interface AuthContextProps {
//     value: any | string;
// }

interface AuthContextProps {
    user: string | null;
}

const AuthContext = createContext<AuthContextProps>({user: null});

export function AuthProvider({ children, value }: {children: ReactNode, value: any}) {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function userAuthValue() {
    return useContext(AuthContext);
}