import { Client, Room } from "colyseus";

import { MessageType } from "../types";
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
};
