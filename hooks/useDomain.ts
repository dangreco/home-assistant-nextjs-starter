import { pickBy } from "lodash";
import useHass from "./useHass";

const useDomain = (domain: string) => {
  const {
    entities,
  } = useHass();

  return pickBy(entities, (_v,k) => k.startsWith(domain));
};

export default useDomain;