import { ConnectionRepository } from '../gateways/ConnectionRepository';

export type ConnectInput = {
  connectionId: string;
};

export type ConnectOutput = void;

export interface OnConnect {
  (input: ConnectInput): Promise<ConnectOutput>;
}

export const OnConnectInteractor = (
  connectionRepository: ConnectionRepository,
): OnConnect => async ({ connectionId }) => {
  await connectionRepository.saveConnection({ connectionId });
};
