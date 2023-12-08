import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

interface DeleteState {
    loading: boolean | null;
    error: string | null;
}

interface DeleteAction {
    type: "LOADING" | "DELETE_DOC" | "ERROR" | "DELETED_DOC";
    payload?: any | string;
}

const initialState: DeleteState = {
    loading: null,
    error: null
}

const deleteReducer = (state: DeleteState, action: DeleteAction): DeleteState => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "DELETE_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

interface useDeleteDocument {
    deleteDocument: (id: string) => Promise<void>;
    response: DeleteState;
}

export const useDeleteDocument = (docCollection: string) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    // deal memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action: DeleteAction) => {
        if (!cancelled) {
            dispatch(action)
        }
    };

    const deleteDocument = async (id: string): Promise<void> => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        });

        try {
            const deletedDocument = await deleteDoc(doc(db, docCollection, id))

            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument,
            });
        } catch (error: any) {
            // checkCancelBeforeDispatch({
            //     type: "DELETED_DOC",
            //     payload: deleteDocument,
            // });
            checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, [])


    return { deleteDocument, response };
};
