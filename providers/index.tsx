import React from 'react';
import HassProvider from "./HassProvider";
import AuthProvider from "./AuthProvider";
import SearchProvider from './SearchProvider';

const AppProvider: React.FunctionComponent = ({
  children
}) => (
  <AuthProvider>
    <HassProvider>
      <SearchProvider>
        { children }
      </SearchProvider>
    </HassProvider>
  </AuthProvider>
);

export default AppProvider;
