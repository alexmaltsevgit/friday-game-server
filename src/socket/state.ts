import { MapSchema, Schema, type } from "@colyseus/schema";

import { RoomStage } from "../types";

export type Player = {
  realName?: string;
  fictionName?: string;
};

export class PlayerState extends Schema {
  @type("string") realName?: string;
  @type("string") fictionName?: string;
  @type("number") winnerNumber?: number;
  @type("boolean") isWinner: boolean = false;

  constructor({ realName, fictionName }: Player) {
    super();

    this.realName = realName;
    this.fictionName = fictionName;
  }
}

export class GameState extends Schema {
  @type("string") ownerId?: string;
  @type("string") stage: RoomStage = RoomStage.Awaiting;
  @type("number") winnersCount: number = 0;
  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
}
