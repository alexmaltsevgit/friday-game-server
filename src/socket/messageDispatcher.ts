import { Client, Room } from "colyseus";

import { MessageType } from "../types";
import { GameState, PlayerState } from "./state";

export const messageDispatcher: Record<
  MessageType,
  (room: Room<GameState>, client: Client, payload: any) => void
> = {
  [MessageType.ChangeGameStage]: (room, client, payload) =>
    (room.state.stage = payload.newStage),

  [MessageType.ChangePlayerFictionName]: (room, client, payload) => {
    const player = room.state.players.get(payload.playerId);
    if (!player) return;

    player.fictionName = payload.newFictionName;
  },

  [MessageType.DeclareMyselfWinner]: (room, client) => {
    const player = room.state.players.get(client.sessionId);
    if (!player) return;

    const winnersCount = Object.values(room.state.players.toJSON()).filter(
      (player) => (player as PlayerState).isWinner
    ).length;

    const anotherWinnerNumber = winnersCount + 1;

    player.isWinner = true;
    player.winnerNumber = anotherWinnerNumber;
  },
};
