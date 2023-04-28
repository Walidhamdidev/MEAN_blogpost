import mongoose from "mongoose";

export default async function db(app) {
  const PORT = process.env.PORT;
  const MONGO_URI = process.env.MONGO_URI;

  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => console.log("Connected"));
  } catch (error) {
    console.log(error.message);
  }
}
