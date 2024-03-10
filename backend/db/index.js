import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://parthgala1356:parth123@cluster0.oemapy0.mongodb.net/chat-app?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI || process.env.MONGODB_URI}`
    );
    console.log(
      "\nMongoDB connected!! DB HOST: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
};

export default connectDB;
