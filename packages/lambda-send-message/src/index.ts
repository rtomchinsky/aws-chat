import { APIGatewayEvent } from 'aws-lambda';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import pino from 'pino';
import { DynamoDbConnectionRepository } from '../../backend-core/src';
import ApiGatewayManagementApi from 'aws-sdk/clients/apigatewaymanagementapi';
import { ApiGatewayMessageSender } from '../../backend-core/src/gateways/ApiGatewayMessageSender';
import { SendMessageInteractor } from '../../backend-core/src/useCases/SendMessage';

export const handler = async (event: APIGatewayEvent) => {
  const logger = pino();
  const connectionRepository = new DynamoDbConnectionRepository(
    new DocumentClient({
      apiVersion: '2012-08-10',
      region: process.env.AWS_REGION,
    }),
  );
  const apiGatewayManagementApi = new ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: `${event.requestContext.domainName}/${event.requestContext.stage}`,
  });
  const messageSender = new ApiGatewayMessageSender(apiGatewayManagementApi);
  const sendMessage = SendMessageInteractor(
    connectionRepository,
    messageSender,
  );

  try {
    await sendMessage({
      message: JSON.parse(event.body).message,
      senderConnectionId: event.requestContext.connectionId!,
    });
    return { statusCode: 200, body: 'Connected' };
  } catch (e) {
    logger.error('Failed to connect: %s', e.message);
    return { statusCode: 500, body: `Failed to connect ${JSON.stringify(e)}` };
  }
};
