import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    orderby,
    onSnapshot,
    where,
} from "firebase/firestore";

export const useFetchDocument = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
}