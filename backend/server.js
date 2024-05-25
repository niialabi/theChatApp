import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import * as MessagesController from "./controllers/MessagesController.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use("/", router);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    io.emit("message", "user has disconnected");
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(`room-${roomId}`);
    console.log(`User joined room: room-${roomId}`);
  });

  socket.on("message", async (data) => {
    if (data.message.owner && data.message.content && data.message.roomId) {
      try {
        const newMsg = await MessagesController.createMessage(data.message); // Await the result
        console.log("newMsg", newMsg);
        io.to(`room-${data.message.roomId}`).emit("message", {
          message: newMsg,
        }); // Emit to the specific room
      } catch (error) {
        console.error("Error creating message:", error);
      }
    }
  });
});
