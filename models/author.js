import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Author", AuthorSchema);
