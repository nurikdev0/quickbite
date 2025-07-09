import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then(() => {
    console.log("MongoDB connected!");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function () {
      console.info(`server running: ${PORT}`);
      console.info(`Admin server running: http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => {
    err;
  });
