import { Connection } from '../entities/Connection';

export interface ConnectionRepository {
  saveConnection(connection: Connection): Promise<Connection>;
  deleteConnection(connectionId: string): Promise<void>;
  findConnections(): Promise<Connection[]>;
  findOtherConnections(senderConnectionId: string): Promise<Connection[]>;
}
