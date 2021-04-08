import { ConnectionRepository } from '../gateways/ConnectionRepository';
import { MessageSender } from '../gateways/MessageSender';

export type SendMessageInput = {
  senderConnectionId: string;
  message: string;
};

export type SendMessageOutput = void;

export interface SendMessage {
  (input: SendMessageInput): Promise<SendMessageOutput>;
}

export const SendMessageInteractor = (
  connectionRepository: ConnectionRepository,
  messageSender: MessageSender,
): SendMessage => async ({ message, senderConnectionId }) => {
  const connections = await connectionRepository.findOtherConnections(
    senderConnectionId,
  );

  await Promise.all(
    connections.map(async (connection) => {
      await messageSender.sendMessage(connection, message);
    }),
  );
};
