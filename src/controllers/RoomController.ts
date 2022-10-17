import { Socket } from "socket.io";
import { SocketRoomEvent } from "../types";
import { RoomService } from "../service/RoomService";

export class RoomController {
  constructor(private socket: Socket) {}

  [SocketRoomEvent.CreateRoom] = () => RoomService.createRoom();
}
