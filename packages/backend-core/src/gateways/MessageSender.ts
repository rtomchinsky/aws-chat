import { Connection } from '../entities/Connection';

export interface MessageSender {
  sendMessage(connection: Connection, message: string): Promise<boolean>;
}
