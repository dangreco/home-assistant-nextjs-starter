import React, { useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import SearchContext from '../contexts/SearchContext';
import useHass from '../hooks/useHass';

const SearchProvider: React.FunctionComponent = ({
  children,
}) => {
  const {
    entities,
  } = useHass();

  const fuse = useRef<Fuse<any> | undefined>(
    new Fuse(
      [], 
      {
        keys: [
          'entity_id', 
          'friendly_name'
        ],
        threshold: 0.2,
      }
    )
  );

  useEffect(() => {
    fuse.current.setCollection(
      Object.values(entities).map(
        ({ entity_id, attributes: { friendly_name } }) => ({
          entity_id,
          friendly_name,
        })
      )
    )
  }, [entities]);

  return (
    <SearchContext.Provider value={fuse.current}>
      { children }
    </SearchContext.Provider>
  )

}

export default SearchProvider;