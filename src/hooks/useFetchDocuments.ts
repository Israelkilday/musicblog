import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
} from "firebase/firestore";

interface FetchDocumentsProps {
    docCollection: string;
    search?: string | null;
    uid?: string | null;
}

export const useFetchDocuments = (
    { docCollection, search = null, uid = null }: FetchDocumentsProps) => {
    const [documents, setDocuments] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean | null>(null);

    // deal memory leak
    const [cancelled, setCancelled] = useState<boolean>(false);

    useEffect(() => {
        async function loadData() {
            if (cancelled) return;

            setLoading(true);


            // if (!docCollection) {
            //     setLoading(false);
            //     setError("O caminho da coleção não pode ser vazio.");
            //     return;
            // }

            console.log("docCollection:", docCollection);

            const collectionRef = await collection(db, docCollection)

            try {
                let q;

                if (search) {
                    q = await query(
                        collectionRef,
                        where("tagsArray", "array-contains", search),
                        orderBy("createdAt", "desc")
                    );
                } else if (uid) {
                    q = await query(
                        collectionRef,
                        where("uid", "==", uid),
                        orderBy("createdAt", "desc")
                    );
                } else {
                    q = await query(collectionRef, orderBy("createdAt", "desc"));
                }

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                });

                setLoading(false);

            } catch (error: any | string) {
                console.log(error);
                setError(error.message);

                setLoading(false);
            };
        }

        loadData();
    }, [docCollection, search, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
};