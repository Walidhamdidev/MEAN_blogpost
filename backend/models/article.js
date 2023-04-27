import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    idAuthor: {
      type: String,
    },
    description: {
      type: String,
    },

    content: {
      type: String,
    },
    image: {
      type: String,
    },
    tags: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Article", ArticleSchema);
