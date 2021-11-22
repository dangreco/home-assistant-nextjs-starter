import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import StatusContext from '../../contexts/StatusContext';
import { ConnectionStatus } from '../../types';

const StatusText: Record<ConnectionStatus, string> = {
  [ConnectionStatus.Connected]: "Connected",
  [ConnectionStatus.Disconnected]: "Disconnected",
  [ConnectionStatus.Reconnecting]: "Reconnecting"
}

const Status: React.FunctionComponent = ({}) => {

  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>();
  const status = useContext(StatusContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    setShowModal(true);
    if (status !== ConnectionStatus.Reconnecting) {
      setTimeout(() => {
        setShowModal(false);
        timeout.current = undefined;
      }, 3000);
    }
  }, [status]);

  return (
    <StatusModal show={showModal}>
      { StatusText[status] }
    </StatusModal>
  )

};

export default Status;

const StatusModal = styled.div<{ show: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  font-weight: bold;
  transition: all .25s ease-in-out;

  @media screen and (max-width: 1200px) {
    bottom: 1rem;
    right: 1rem;
  }

  ${({ show }) => `
    opacity: ${show ? 1 : 0};
    transform: translateY(${show ? 0 : '200%'});
  `}
`;