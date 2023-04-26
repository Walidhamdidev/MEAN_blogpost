import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    picture: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Article", ArticleSchema);
