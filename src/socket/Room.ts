import { Client, Room } from "colyseus";
import { MapSchema, Schema, type } from "@colyseus/schema";

import { RoomStatus } from "../types";

type Player = {
  realName?: string;
  fictionName?: string;
};

class PlayerState extends Schema {
  @type("string") realName?: string;
  @type("string") fictionName?: string;

  constructor({ realName, fictionName }: Player) {
    super();

    this.realName = realName;
    this.fictionName = fictionName;
  }
}

class GameState extends Schema {
  @type("string") ownerId?: string;
  @type("string") status: RoomStatus = RoomStatus.Awaiting;
  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
}

export class GameRoom extends Room<GameState> {
  onCreate(options: any) {
    this.setPrivate(true);
    this.setState(new GameState());
  }

  onJoin(client: Client, options: Player) {
    const { realName, fictionName } = options;

    this.state.players.set(
      client.sessionId,
      new PlayerState({ realName, fictionName })
    );

    this.state.ownerId ??= client.sessionId;
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId);
    if (this.state.players.size === 0) return this.disconnect();

    if (client.sessionId === this.state.ownerId) {
      const allPlayers = Array.from(this.state.players.keys());
      this.state.ownerId = allPlayers[0];
    }
  }
}
