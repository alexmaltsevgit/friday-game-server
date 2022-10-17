import { Socket } from "socket.io";

import { RoomController } from "./RoomController";

export const createEndpoints = (socket: Socket): Record<string, Function> => ({
  ...new RoomController(socket),
});
