import { Client, Room } from "colyseus";

import { MessageType, RoomStage } from "../types";
import { GameState } from "./state";

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

    // increase winners count, make requested player a winner
    room.state.winnersCount += 1;
    player.isWinner = true;
    player.winnerNumber = room.state.winnersCount;

    if (room.state.winnersCount >= room.state.players.size) {
      room.state.stage = RoomStage.Finished;
    }
  },
};
