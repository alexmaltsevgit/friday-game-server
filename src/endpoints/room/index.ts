import { PartialRecord, SocketRoomEvent } from "../../types";
import { onCreateRoom } from "../../commands";

export const roomEndpoints: PartialRecord<SocketRoomEvent, Function> = {
  [SocketRoomEvent.CreateRoom]: onCreateRoom,
};
