import { 
  createConnection,
  getAuth,
  subscribeConfig, 
  subscribeEntities, 
  subscribeServices 
} from 'home-assistant-js-websocket';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import StatusContext from '../contexts/StatusContext';
import useAuth from '../hooks/useAuth';
import useAuthStore from '../stores/auth.store';
import useHassStore from '../stores/hass.store';
import { ConnectionStatus } from '../types';

const HassWrapper: React.FunctionComponent = ({
  children
}) => {

  const {
    auth,
  } = useAuth();

  const {
    connection,
  } = useHassStore();

  const router = useRouter();

  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.Disconnected);

  const ready = () => setStatus(ConnectionStatus.Connected);
  const disconnected = () => {
    setStatus(ConnectionStatus.Disconnected);
    setTimeout(() => setStatus(ConnectionStatus.Reconnecting), 5000);
  };

  useEffect(() => {
    if (connection) {
      if (connection.haVersion) setStatus(ConnectionStatus.Connected);
      connection.addEventListener('ready', ready);
      connection.addEventListener('disconnected', disconnected);
      subscribeEntities(connection, (entities) =>
        useHassStore.setState((s) => ({ ...s, entities }))
      );
      subscribeServices(connection, (services) => 
        useHassStore.setState((s) => ({ ...s, services }))
      );
      subscribeConfig(connection, (config) => {
        useHassStore.setState((s) => ({ ...s, config }))
      });
    }

    return () => {
      connection?.removeEventListener('ready', ready);
      connection?.removeEventListener('disconnected', disconnected);
    }
  }, [connection]);

  const routine = async () => {
    if (!connection || !(await connection.ping())) {
      setStatus(ConnectionStatus.Reconnecting);
      if (auth && auth.accessToken) {
        try {
          const _connection = await createConnection({ auth });
          useHassStore.setState({ connection: _connection });
        } catch (err) {
          setStatus(ConnectionStatus.Disconnected)
        }
      }
    } else {
      // We are connected!
      setStatus(ConnectionStatus.Connected);
    }
  }

  useEffect(() => {
    routine();
  }, [auth]);

  return (
    <StatusContext.Provider value={status}>
      { children }
    </StatusContext.Provider>
  )
}

export default HassWrapper;