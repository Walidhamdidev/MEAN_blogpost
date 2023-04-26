import authorRoutes from "../routes/author.js";
import articleRoutes from "../routes/article.js";

export default function routes(app) {
  //localhost:3000/api/author/ (signin/signup) @POST
  app.use("/api/author/", authorRoutes);
  app.use("/api/article/", articleRoutes);
}
