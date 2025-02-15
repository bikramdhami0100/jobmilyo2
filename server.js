
// import { createServer } from "node:http";
// import next from "next";
// import { Server } from "socket.io";

// const dev = process.env.NODE_ENV !== "production";
// const hostname = process.env.HOSTNAME || "localhost";
// const port = parseInt(process.env.PORT || "3000", 10);

// // Initialize Next.js app
// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler();

// app.prepare().then(() => {
//   // Create HTTP server
//   const httpServer = createServer(handler);

//   // Initialize Socket.IO server
//   const io = new Server(httpServer);

//   io.on("connection", (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     // Handle "join_user" event
//     socket.on("join_user", ({ room, username, receiverId }) => {
//       console.log(`User ${username} joined room: ${room}`);
//       socket.join(room); // Join the room
//       socket.emit("join_success", { room, username, receiverId });
//     });

//     // Handle "messages" event
//     socket.on("messages", ({ message, sender, room, senderId }) => {
//       console.log(`User ${sender} sent a message to room: ${room}`);
//       // Broadcast the message to all users in the room
//       io.to(room).emit("con_message", { sender, message, senderId });
//     });

//     // Handle "disconnect" event
//     socket.on("disconnect", () => {
//       console.log(`User disconnected: ${socket.id}`);
//     });
//   });

//   // Start the server
//   httpServer.listen(port, () => {
//     console.log(`Server running on http://${hostname}:${port}`);
//   });
// });

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

    // Handle video call initiation
    socket.on("callSignal", ({ signal, senderId, receiverId, room }) => {
      console.log(`Call initiated by ${senderId} to ${receiverId} in room ${room}`);
      io.to(room).emit("callSignal", { signal, senderId });
    });

    // Handle call acceptance
    socket.on("callAccepted", ({ signal, senderId, receiverId, room }) => {
      console.log(`Call accepted by ${receiverId} for ${senderId} in room ${room}`);
      io.to(room).emit("callAccepted", signal);
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
