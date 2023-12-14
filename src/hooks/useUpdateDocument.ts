// HOOKS
import { useState, useEffect, useReducer } from "react";
// FIREBASE
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

interface UpdateState {
    loading: boolean | null;
    error: string | null;
}

interface UpdateActions {
    type: "LOADING" | "UPDATED_DOC" | "ERROR";
    payload?: any | string;   
}

const initialState: UpdateState = {
    loading: null,
    error: null
}

const updateReducer = (state: UpdateState, action: UpdateActions): UpdateState => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "UPDATED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const useUpdateDocument = (docCollection: string) => {
    const [response, dispatch] = useReducer(updateReducer, initialState);

    // deal memory leak
    const [cancelled, setCancelled] = useState<boolean>(false);

    const checkCancelBeforeDispatch = (action: UpdateActions) => {
        if (!cancelled) {
            dispatch(action)
        }
    };

    const updateDocument = async (id: string, data: any | string) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        });

        try {
            const docRef = await doc(db, docCollection, id);

            const updatedDocument = await updateDoc (docRef, data);


            checkCancelBeforeDispatch({
                type: "UPDATED_DOC",
                payload: updatedDocument,
            });
        } catch (error: any | string) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return { updateDocument, response };
};
