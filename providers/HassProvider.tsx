/* eslint-disable react-hooks/exhaustive-deps */
import { 
  createConnection,
  subscribeConfig, 
  subscribeEntities, 
  subscribeServices 
} from 'home-assistant-js-websocket';
import React, { useEffect, useState } from 'react';
import StatusContext from '../contexts/StatusContext';
import useAuth from '../hooks/useAuth';
import useHassStore from '../stores/hass.store';
import { ConnectionStatus } from '../types';

const HassWrapper: React.FunctionComponent = ({
  children
}) => {
  const { auth } = useAuth();
  const { connection } = useHassStore();
  const [status, setStatus] = useState(ConnectionStatus.Disconnected);

  const onReady = () => setStatus(ConnectionStatus.Connected);
  const onDisconnect = () => {
    setStatus(ConnectionStatus.Disconnected);
    setTimeout(() => {
      setStatus(s => s === ConnectionStatus.Disconnected ? ConnectionStatus.Reconnecting : s);
    }, 3000);
  }

  const connect = async () => {
    try {
      const c = await createConnection({ auth });
      if (c) {
        setStatus(ConnectionStatus.Connected);
        useHassStore.setState({ connection: c });
        subscribeEntities(c, entities => useHassStore.setState({ entities }));
        subscribeServices(c, services => useHassStore.setState({ services }));
        subscribeConfig(c, config => useHassStore.setState({ config }));
        connection.addEventListener('ready', onReady);
        connection.addEventListener('disconnected', onDisconnect);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (auth && !connection) {
      connect();
    }
    if (!auth && connection) {
      useHassStore.destroy();
    }
  }, [auth, connection]);

  return (
    <StatusContext.Provider value={status}>
      { children }
    </StatusContext.Provider>
  )
}

export default HassWrapper;