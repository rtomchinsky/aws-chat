import type { APIGatewayEvent } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import pino from 'pino';
import { DynamoDbConnectionRepository } from '../../backend-core/src';
import { OnConnectInteractor } from '../../backend-core/src/useCases/OnConnect';

export const handler = async (event: APIGatewayEvent) => {
  const logger = pino();
  const connectionRepository = new DynamoDbConnectionRepository(
    new DocumentClient({
      apiVersion: '2012-08-10',
      region: process.env.AWS_REGION,
    }),
  );
  const onConnect = OnConnectInteractor(connectionRepository);

  try {
    await onConnect({ connectionId: event.requestContext.connectionId });
    return { statusCode: 200, body: 'Connected' };
  } catch (e) {
    logger.error('Failed to connect: %s', e.message);
    return { statusCode: 500, body: `Failed to connect ${JSON.stringify(e)}` };
  }
};
