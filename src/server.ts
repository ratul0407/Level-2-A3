import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const PORT = 5000;
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://level-2:y1i6U9le12BqI1OY@ratul.gtek0.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Ratul"
    );
    console.log("connected to mongodb using mongoose");
    server = app.listen(PORT, () => {
      console.log(`App is running in port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
