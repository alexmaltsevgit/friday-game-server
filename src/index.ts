import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { createServer } from "http";
import { GameRoom } from "./socket/Room";

const http = express();
http.use(cors());
http.get("/", (req, res) => res.json({ ok: true }));

const socket = new Server({
  transport: new WebSocketTransport({ server: createServer() }),
  greet: false,
});

if (process.env.NODE_ENV !== "production") socket.simulateLatency(200);

socket.define("game", GameRoom);

http.listen(3010);
socket.listen(3015);
