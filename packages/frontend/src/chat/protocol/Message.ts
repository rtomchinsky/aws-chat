import { DateTime } from 'luxon';

export class IncomingMessage {
  constructor(
    public readonly message: string,
    public readonly timestamp: DateTime,
  ) {}
}

export class OutgoingMessage {
  constructor(
    public readonly message: string,
    public readonly timestamp: DateTime,
  ) {}
}
