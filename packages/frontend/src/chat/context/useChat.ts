import React from 'react';
import { ChatContext } from './ChatContext';

export const useChat = () => React.useContext(ChatContext);
