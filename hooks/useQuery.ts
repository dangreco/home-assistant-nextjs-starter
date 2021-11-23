import { useHass } from "@hooks";
import { useContext, useMemo } from "react"
import SearchContext from "../contexts/SearchContext"

const useQuery = (query: string) => {

  const {
    entities,
  } = useHass();

  const fuse = useContext(SearchContext);

  const results = useMemo(() => {
    if (!fuse) return [];
    return fuse.search(query);
  }, [fuse, query]);
  
  return Object.fromEntries(
    results.map(
      ({ item: { entity_id } }) => [entity_id, entities[entity_id]]
    )
  )
}

export default useQuery;