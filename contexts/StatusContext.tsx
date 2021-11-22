import React, { createContext } from 'react';
import { ConnectionStatus } from '../types';

const StatusContext = createContext<ConnectionStatus>(ConnectionStatus.Disconnected);

export default StatusContext;