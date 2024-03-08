import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config();
const MONGODB_URI =
  "mongodb+srv://parthgala1356:parth123@cluster0.oemapy0.mongodb.net/chat-app?retryWrites=true&w=majority&appName=Cluster0";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on PORT ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", err);
  });
