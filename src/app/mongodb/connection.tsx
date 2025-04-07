// import mongoose from "mongoose";

// // Connect to MongoDB
// const mongodbconn=mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL!, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
// });
// export default mongodbconn;

// app/mongodb/connection.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URL! || ""; // Ensure this is defined
const opts = {}; // Add your mongoose connection options here

// Define a cached object with proper types
interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use a global variable to persist the connection across hot reloads in development
declare global {
  var _mongooseCached: Cached | undefined;
}

const cached: Cached = global._mongooseCached || { conn: null, promise: null };
global._mongooseCached = cached;

async function mongodbconn() {
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default mongodbconn;