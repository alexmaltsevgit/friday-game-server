import { Client, Room } from "colyseus";

import { GameState, Player, PlayerState } from "./state";
import { messageDispatcher } from "./messageDispatcher";
import { MessageType } from "../types";

export class GameRoom extends Room<GameState> {
  onCreate(options: any) {
    this.setPrivate(true);
    this.setState(new GameState());

    this.onMessage("*", (client, type, options) =>
      messageDispatcher[type as MessageType]?.(this, client, options)
    );
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
