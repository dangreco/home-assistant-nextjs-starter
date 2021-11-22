import { useContext, useMemo } from "react"
import SearchContext from "../contexts/SearchContext"

const useQuery = (query: string) => {
  const fuse = useContext(SearchContext);

  const results = useMemo(() => {
    if (!fuse) return [];
    return fuse.search(query);
  }, [fuse, query]);
  
  return results;
}

export default useQuery;