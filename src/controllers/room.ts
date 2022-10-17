import { Socket } from "socket.io";
import { SocketRoomEvent } from "../types";

export class RoomController {
  constructor(private socket: Socket) {}

  [SocketRoomEvent.CreateRoom] = () => console.log("create room");
}
