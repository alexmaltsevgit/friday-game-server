import { Socket } from "socket.io";
import { SocketRoomEvent } from "../types";
import { RoomService } from "../service";

export class RoomController {
  constructor(private socket: Socket) {}

  [SocketRoomEvent.CreateRoom] = async () => {
    const id = await RoomService.createRoom();
    if (!id) return;

    this.socket.join(id);
    this.socket.emit(SocketRoomEvent.ConnectedToRoom, { id });
  };
}
