import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

interface DocumentData {
  title: string;
  image: string;
  body: string;
  tagsArray: string[];
  uid: string;
  createdBy: string;
}

interface InsertState {
  loading: boolean | null;
  error: string | null;
}

interface InsertActions {
  type: "LOADING" | "INSERTED_DOC" | "ERROR";
  payload?: any | string;
}

const initialState: InsertState = {
  loading: null,
  error: null,
};

const insertReducer = (
  state: InsertState,
  action: InsertActions
): InsertState => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection: string) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action: InsertActions) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (DocumentData: DocumentData) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const newDocument = { ...DocumentData, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
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
  }, []);

  return { insertDocument, response };
};
