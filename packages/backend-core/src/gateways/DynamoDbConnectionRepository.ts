import { Connection } from '..';
import { ConnectionRepository } from './ConnectionRepository';

import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const CONNECTION_TABLE_NAME = process.env.CONNECTION_TABLE_NAME!;

export class DynamoDbConnectionRepository implements ConnectionRepository {
  constructor(private client: DocumentClient) {}

  async saveConnection({ connectionId }: Connection): Promise<Connection> {
    const putParams = {
      TableName: CONNECTION_TABLE_NAME,
      Item: {
        connectionId,
      },
    };
    try {
      await this.client.put(putParams).promise();
      return { connectionId };
    } catch (e) {
      throw new Error(
        `Failed to save connection to the database: ${e.message}`,
      );
    }
  }

  async deleteConnection(connectionId: string): Promise<void> {
    const deleteParams = {
      TableName: CONNECTION_TABLE_NAME,
      Key: { connectionId },
    };
    try {
      await this.client.delete(deleteParams).promise();
    } catch (e) {
      throw new Error(
        `Failed to save connection to the database: ${e.message}`,
      );
    }
  }

  private async find(
    scanParams: DocumentClient.ScanInput,
  ): Promise<Connection[]> {
    try {
      const result = await this.client.scan(scanParams).promise();
      return (
        result.Items?.map((item) => ({ connectionId: item.connectionId })) ?? []
      );
    } catch (e) {
      throw new Error(
        `Failed to find connections in the database: ${e.message}`,
      );
    }
  }

  async findConnections(): Promise<Connection[]> {
    return this.find({
      TableName: CONNECTION_TABLE_NAME,
    });
  }

  async findOtherConnections(
    senderConnectionId: string,
  ): Promise<Connection[]> {
    console.log(
      `Attempting to find connections other than '${senderConnectionId}'`,
    );
    const found = await this.find({
      TableName: CONNECTION_TABLE_NAME,
      FilterExpression: 'connectionId <> :connectionId',
      ExpressionAttributeValues: {
        ':connectionId': senderConnectionId,
      },
    });
    console.log(
      `Got connections: ${found
        .map((it) => `'${it.connectionId}'`)
        .join(', ')}`,
    );
    return found;
  }
}
