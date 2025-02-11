import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  // Create HTTP server
  const httpServer = createServer(handler);

  // Initialize Socket.IO server
  const io = new Server(httpServer);

  // Socket.IO connection handler
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle "join_user" event
    socket.on("join_user", ({ room, username }) => {
      console.log(`User ${username} joined room: ${room}`);
      socket.join(room); // Join the room
      socket.emit("join_success", { room, username, value: "Hello, world!" });
    });

    // Handle "disconnect" event
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  // Start the server
  httpServer.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  });
});