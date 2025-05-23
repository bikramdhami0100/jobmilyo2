
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import onCall from "./src/app/socket-events/onCall.js"
import onWebrtcSignal from "./src/app/socket-events/onWebrtcSignal.js"
import onHangup from "./src/app/socket-events/onHangup.js";
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
export let io;
app.prepare().then(() => {
  // Create HTTP server
  const httpServer = createServer(handler);

  const socketIdKeyAndReceiverIdValue=new Map();
  const  receiverIdKeyAndSocketIdValue=new Map();
  // Initialize Socket.IO server
   io = new Server(httpServer, {
    cors: {
      origin: "*", // Adjust as needed for security
      methods: ["GET", "POST"],
    },
  });

  let onlineUsers = [];

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user joining a room
    socket.on("join_user", ({ room, username, receiverId }) => {
      console.log(`User ${username} joined room: ${room}`);
      console.log(username,receiverId,"this is receiver id");
      socketIdKeyAndReceiverIdValue.set(socket.id,receiverId);
      receiverIdKeyAndSocketIdValue.set(receiverId,socket.id);
      
      socket.join(room);
      socket.emit("join_success", { room, username, receiverId });
    });

    // Handle text messages
    socket.on("messages", ({ message, sender, room, senderId }) => {
      console.log(`User ${sender} sent a message to room: ${room}`);
      io.to(room).emit("con_message", { sender, message, senderId });
    });


   socket.on("addNewUsers",({userId,userData})=>{
    console.log(userData)
    userId&&!onlineUsers.some((user)=>user.userId===userId)
    &&onlineUsers.push({userId,userData,socketId:socket.id})
      io.emit("getUsers",onlineUsers);
   })

   //CALL USER
     socket.on("call",onCall);
     socket.on("webrtcSignal",onWebrtcSignal);
     socket.on("hangup",onHangup);
 
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        //send active users
         io.emit("getUsers",onlineUsers);
    });
  });

  // Start the server
  httpServer.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  });
});
