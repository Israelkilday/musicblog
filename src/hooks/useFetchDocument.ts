    // HOOKS
    import { useState, useEffect } from "react";
    // FIREBASE
    import { db } from "../firebase/config";
    import { doc, getDoc } from "firebase/firestore";
        
    export const useFetchDocument = (docCollection: string, id: string) => {
        const [document, setDocument] = useState<any | null>(null);
        const [error, setError] = useState<string | null>(null);
        const [loading, setLoading] = useState<boolean | null>(null);

        // deal memory leak
        const [cancelled, setCancelled] = useState<boolean>(false);

        useEffect(() => {
            async function loadDocument() {
                if (cancelled) return;

                setLoading(true);

                try {
                    const docRef = await doc(db, docCollection, id);  
                    const docSnap = await getDoc(docRef);

                    setDocument(docSnap.data())
                    setLoading(false);

                } catch (error: any | string) {
                    console.log(error);
                    setError(error.message);
                    setLoading(true);
                }
            }

            loadDocument();
        }, [docCollection, id, cancelled])

        useEffect(() => {
            return () => setCancelled(true);
        }, []);

        return { document, loading, error };
    }