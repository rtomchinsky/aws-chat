import { ConnectionRepository } from '../gateways/ConnectionRepository';

export type DisconnectInput = {
  connectionId: string;
};

export type DisconnectOutput = void;

export interface OnDisconnect {
  (input: DisconnectInput): Promise<DisconnectOutput>;
}

export const OnDisconnectInteractor = (
  connectionRepository: ConnectionRepository,
): OnDisconnect => async ({ connectionId }) => {
  await connectionRepository.deleteConnection(connectionId);
};
