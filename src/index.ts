import { Server } from "socket.io";
import express from "express";
import cors from "cors";

import { AllCommands } from "./types";
import { endpoints } from "./endpoints";

const socket = new Server({
  cors: {
    origin: "*",
  },
});

const http = express();

http.use(cors());
http.get("/", (req, res) => res.json({ ok: true }));

socket.on("connection", (s) => {
  Object.values(AllCommands).forEach((command) => {
    if (endpoints[command]) {
      // @ts-ignore
      s.on(command, endpoints[command]);
    }
  });
});

http.listen(3010);
socket.listen(3015);
