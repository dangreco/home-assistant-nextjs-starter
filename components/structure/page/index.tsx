import React from "react";
import styled from 'styled-components';
import { StatusModal } from "../../modals";

const Page: React.FunctionComponent = ({ children }) => {

  return (
    <Root>
      { children } 
      <StatusModal />
    </Root>
  );
  
}
export default Page;

const Root = styled.div`
`;