import mongoose from "mongoose";

// Connect to MongoDB
const mongodbconn=mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL!, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
export default mongodbconn;