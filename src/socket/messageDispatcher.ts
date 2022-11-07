import { Client, Room } from "colyseus";

import { MessageType } from "../types";
import { GameState } from "./state";

export const messageDispatcher: Record<
  MessageType,
  (room: Room<GameState>, client: Client, payload: any) => void
> = {
  [MessageType.ChangeGameStage]: (room, client, payload) =>
    (room.state.stage = payload.newStage),
};
