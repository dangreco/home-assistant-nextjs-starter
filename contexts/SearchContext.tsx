import Fuse from 'fuse.js';
import React, { createContext } from 'react';

const SearchContext = createContext<Fuse<any> | undefined>(undefined);

export default SearchContext;