import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const socket = new Server({
  cors: {
    origin: "*",
  },
});

const http = express();

http.use(cors());
http.get("/", (req, res) => res.json({ ok: true }));

socket.on("connection", (s) => {
  s.on("room:create", () => console.log("room:create"));
});

http.listen(3010);
socket.listen(3015);
