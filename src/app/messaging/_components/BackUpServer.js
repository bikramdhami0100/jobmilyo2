
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
  const userSocketMap = {};
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
      userSocketMap[receiverId] = socket.id;
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
    socket.on("join_video_room", ({ roomId, senderId,receiverId }) => {
      socket.join(roomId);
      console.log(`User ${senderId} joined room ${roomId}`);
      socket.to(roomId).emit("incomming_call", { roomId, senderId,receiverId });

  });
  
  socket.on("accept_video_call", ({ roomId, senderId,receiverId }) => {
      socket.join(roomId);
      // console.log(`User ${senderId} joined room ${roomId}`);
      // socket.to(roomId).emit("user_join_for_video", { roomId, senderId,receiverId });
      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("user_join_for_video", { roomId, senderId, receiverId });
      }
  });

   // handle video call events 
   socket.on("decline_call", ({ roomId, senderId,receiverId }) => {
    socket.to(roomId).emit("call_declined", { roomId, senderId,receiverId });
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
      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
    });
  });

  // Start the server
  httpServer.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  });
});
