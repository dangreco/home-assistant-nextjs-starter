import { useHass } from "@hooks";
import { useContext, useMemo } from "react"
import { HassEntitiesOpt } from "types";
import SearchContext from "../contexts/SearchContext"

const useQuery = (query: string): HassEntitiesOpt => {

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