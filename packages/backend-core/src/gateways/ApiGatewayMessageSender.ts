import type { Connection } from '..';
import type { MessageSender } from './MessageSender';
import type ApiGatewayManagementApi from 'aws-sdk/clients/apigatewaymanagementapi';

export class ApiGatewayMessageSender implements MessageSender {
  constructor(private apiGatewayManagementApi: ApiGatewayManagementApi) {}

  async sendMessage(connection: Connection, message: string): Promise<boolean> {
    try {
      await this.apiGatewayManagementApi
        .postToConnection({
          ConnectionId: connection.connectionId,
          Data: JSON.stringify({ action: 'message', message }),
        })
        .promise();

      return true;
    } catch (e) {
      if (e.statusCode === 410) {
        return false;
      }
      throw new Error(`Failed to send message: ${e.message}`);
    }
  }
}
