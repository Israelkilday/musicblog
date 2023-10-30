// REACT-ROUTER-DOM
import { useLocation } from "react-router-dom";
// HOOKS
import { useMemo } from "react";

export function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}
