import Article from "../models/article.js";

const addArticle = async (req, res) => {
  const { title, description, content, tags, authorId, image } = req.body;

  if (!title || !description || !content || !tags || !authorId || !image)
    return res.status(400).json({ erorr: "Please fill all fileds" });
  try {
    await Article.create({
      title,
      description,
      content,
      tags,
    });
    return res.status(200).json({ msg: "Article added!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const articles = await Article.find({});
    return res.status(200).json(articles);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findOne({ _id: id });
    return res.status(200).json(article);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const article = await Article.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true }
    );
    return res.status(200).json(article);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await Article.findByIdAndDelete({ _id: id });
    return res.status(200).json({ msg: "Deleted." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export default {
  getOne,
  getAll,
  addArticle,
  deleteArticle,
  update,
};
