import Author from "../models/author.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";

const generateToken = (payload) => {
  const JWTSecret = process.env.JWT_SECRET;
  const token = JWT.sign(payload, JWTSecret, { expiresIn: "3d" });
  return token;
};

const removeImageFromStorage = (author) => {
  fs.unlink(`./uploads/author/${author.image}`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${author.image} has been deleted`);
  });
};

const register = async (req, res) => {
  const { username, email, password, image } = req.body;

  if (!username)
    return res.status(400).json({ error: "Please enter username." });
  if (!email) return res.status(400).json({ error: "Please enter email." });
  if (!password)
    return res.status(400).json({ error: "Please enter password." });
  if (!image) return res.status(400).json({ error: "Please add image." });

  try {
    const exists = await Author.findOne({ email });
    if (exists) return res.status(401).json({ error: "Email already in use." });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const author = await Author.create({
      username,
      email,
      password: hashPassword,
      image,
    });
    const payload = { email, password };
    const token = generateToken(payload);
    return res.status(200).json({
      author: {
        token,
        email,
        authorId: author._id,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(401).json({ error: "Please enter email." });
  if (!password) {
    return res.status(401).json({ error: "Please enter password." });
  }
  try {
    const author = await Author.findOne({ email });
    if (!author)
      return res
        .status(404)
        .json({ erorr: "There is no author with this email." });

    if (!bcrypt.compareSync(password, author.password))
      return res
        .status(404)
        .json({ erorr: "There is no author with this password." });

    const payload = { email, password };
    const token = generateToken(payload);
    return res
      .status(200)
      .json({ author: { token, email, authorId: author._id } });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findOne({ _id: id });
    return res.status(200).json(author);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const getAll = async (req, res) => {
  try {
    const author = await Author.find();
    return res.status(200).json(author);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (data.image) {
    const author = await Author.findById(id);
    if (author.image) {
      removeImageFromStorage(author);
    }
  }
  try {
    const author = await Author.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true }
    );
    return res.status(200).json(author);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }

  // TODO : store image on Cloudinary / remove from Cloudinary
  // not remove from local if production
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findOneAndDelete({ _id: id });
    removeImageFromStorage(author);
    return res.status(200).json({ msg: "Deleted." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export default {
  login,
  register,
  getOne,
  getAll,
  updateAuthor,
  deleteAuthor,
};
