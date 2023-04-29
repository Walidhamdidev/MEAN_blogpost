import Article from "../models/article.js";
import articleValidations from "../validators/article.js";
import cloudinary from "./cloudinary.js";
import localStorage from "./localStorage.js";

const NODE_ENV = process.env.NODE_ENV;

const addArticle = async (req, res) => {
  const { title, description, content, tags, authorId, image } = req.body;

  try {
    // upload the image to cloudinary if production mode
    let imageSource = image;
    if (NODE_ENV === "production") {
      // allow uploading only if all the fields not empty
      if (!title || !description || !content || !tags || !authorId)
        return res.status(400).json({
          error: "Add all fields then the Image.",
        });
      const imgObj = await cloudinary.uploadImage(image, "article");
      imageSource = {
        url: imgObj.url.toString(),
        public_id: imgObj.public_id.toString(),
      };
    }

    // Convert tags to array if it's a comma-separated string
    let tagArray = tags;

    if (typeof tags === "string") {
      tagArray = tags.split(",").map((tag) => tag.trim());
    }

    // check error
    const { error } = articleValidations.createSchema.validate({
      title,
      description,
      content,
      tags: tagArray,
      authorId,
      image: imageSource,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const article = await Article.create({
      title,
      description,
      content,
      tags: tagArray,
      authorId,
      image: JSON.stringify(imageSource),
    });
    return res.status(200).json(article);
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

  if (data.image) {
    const article = await Article.findById(id);
    if (article.image) {
      removeImageFromStorage(article);
    }
  }

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
    const article = await Article.findOneAndDelete({ _id: id });
    if (!article)
      return res.status(401).json({
        msg: "This article with this id either has been deletedd or not exists.",
      });
    console.log(article.image);
    if (NODE_ENV === "production") {
      cloudinary.deleteImage(JSON.parse(article.image).public_id);
    } else {
      localStorage.removeImage("article", article);
    }
    return res.status(200).json({ msg: "article has been deleted." });
  } catch (error) {
    console.log(error);
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
