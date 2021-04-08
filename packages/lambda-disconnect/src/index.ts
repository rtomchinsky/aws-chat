import { APIGatewayEvent } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import pino from 'pino';
import { DynamoDbConnectionRepository } from '../../backend-core/src';
import { OnDisconnectInteractor } from '../../backend-core/src/useCases/OnDisconnect';

export const handler = async (event: APIGatewayEvent) => {
  const logger = pino();
  const connectionRepository = new DynamoDbConnectionRepository(
    new DocumentClient({
      apiVersion: '2012-08-10',
      region: process.env.AWS_REGION,
    }),
  );
  const onConnect = OnDisconnectInteractor(connectionRepository);

  try {
    await onConnect({ connectionId: event.requestContext.connectionId });
    return { statusCode: 200, body: 'Connected' };
  } catch (e) {
    logger.error('Failed to connect: %s', e.message);
    return { statusCode: 500, body: `Failed to connect ${JSON.stringify(e)}` };
  }
};
