import { pick } from 'lodash';
import useHass from './useHass';

const useEntities = (entityIds?: string[]) => {
  const {
    entities,
  } = useHass();

  return entityIds ? pick(entities, entityIds) : entities;
}

export default useEntities;