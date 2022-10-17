import crypto from "crypto";
import { dto } from "../dto";
import { RoomStatus } from "../types";

export class RoomService {
  static createRoom = async () => {
    const id = crypto.randomInt(0, 10000).toString().padStart(4, "0");

    try {
      const room = await dto.room.create({
        data: { id, status: RoomStatus.FictionNaming },
      });

      return room.id;
    } catch (e) {
      return undefined;
    }
  };
}
