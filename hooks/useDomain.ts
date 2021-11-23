import { pickBy } from "lodash";
import { HassEntitiesOpt } from "types";
import useHass from "./useHass";

const useDomain = (domain: string): HassEntitiesOpt => {
  const {
    entities,
  } = useHass();

  return pickBy(entities, (_v,k) => k.startsWith(domain));
};

export default useDomain;