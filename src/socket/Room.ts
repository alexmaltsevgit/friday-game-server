import { Client, Room } from "colyseus";
import { ArraySchema, Schema, type } from "@colyseus/schema";

export class GameState extends Schema {
  @type(["string"]) players = new ArraySchema<string>();
}

export class GameRoom extends Room<GameState> {
  onCreate(options: any) {
    this.setState(new GameState());
  }

  onJoin(client: Client) {
    this.state.players.push("qwe");
    client.send("state", this.state);
  }
}
