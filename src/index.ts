import { Server } from "socket.io";
import express from "express";

const io = new Server();
const app = express();

app.get("/", (req, res) => res.json({ ok: true }));

io.on("connection", () => console.log("connection"));

app.listen(3010, "127.0.0.1");
