import { pick } from 'lodash';
import { HassEntitiesOpt } from 'types';
import useHass from './useHass';

const useEntities = (entityIds?: string[]): HassEntitiesOpt => {
  const {
    entities,
  } = useHass();

  return entityIds ? pick(entities, entityIds) : entities;
}

export default useEntities;