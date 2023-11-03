import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {
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

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    // deal memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    };

    const deleteDocument = async (id) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        });

        try {
            const deletedDocument = await deleteDoc(doc(db,docCollection, id))
            
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deleteDocument,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, [])


    return { deleteDocument, response };
};
