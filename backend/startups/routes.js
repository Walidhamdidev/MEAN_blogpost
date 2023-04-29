import authorRoutes from "../routes/author.js";
import articleRoutes from "../routes/article.js";

export default function routes(app, express) {
  app.get("/", (req, res) => {
    res.redirect("/api/author");
  });
  app.use("/api/author/", authorRoutes);
  app.use("/api/article/", articleRoutes);
}
