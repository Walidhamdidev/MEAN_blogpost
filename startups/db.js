import mongoose from "mongoose";
import config from "config";

export default async function db(app) {
  const PORT = config.get("PORT");
  const MONGO_URI = config.get("MONGO_URI");

  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => console.log("Connected"));
  } catch (error) {
    console.log(error.message);
  }
}
