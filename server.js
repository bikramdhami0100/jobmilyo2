
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
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Adjust as needed for security
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user joining a room
    socket.on("join_user", ({ room, username, receiverId }) => {
      console.log(`User ${username} joined room: ${room}`);
      socket.join(room);
      socket.emit("join_success", { room, username, receiverId });
    });

    // Handle text messages
    socket.on("messages", ({ message, sender, room, senderId }) => {
      console.log(`User ${sender} sent a message to room: ${room}`);
      io.to(room).emit("con_message", { sender, message, senderId });
    });



    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });
    // handle video call events 
    socket.on("join_room", ({ roomId, email }) => {
      socket.join(roomId);
      console.log(`User ${email} joined room ${roomId}`);
      
      // Notify other users in the room
      socket.to(roomId).emit("user_join", email);
  });
    socket.on("offer", ({ offer, roomId }) => {
      socket.to(roomId).emit("offer", offer);
    });

    socket.on("answer", ({ answer, roomId }) => {
      socket.to(roomId).emit("answer", answer);
    });
  
    socket.on("ice-candidate", ({ candidate, roomId }) => {
      socket.to(roomId).emit("ice-candidate", candidate);
    });
    socket.on("end-call",({roomId})=>{
      socket.to(roomId).emit("call-ended")
    });
    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  // Start the server
  httpServer.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  });
});
