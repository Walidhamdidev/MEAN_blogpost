import authorRoutes from "../routes/author.js";
import articleRoutes from "../routes/article.js";

export default function routes(app, express) {
  //localhost:3000/api/author/ (signin/signup) @POST
  app.use("/api/author/", authorRoutes);
  app.use("/api/authorImage", express.static("./uploads/author"));
  //localhost:3000/api/article/
  app.use("/api/article/", articleRoutes);
  //localhost:3000/api/articleImage/
  app.use("/api/articleImage", express.static("./uploads/article"));
}
