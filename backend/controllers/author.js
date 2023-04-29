import bcrypt from "bcrypt";

import Author from "../models/author.js";
import authorValidations from "../validators/author.js";
import cloudinary from "./cloudinary.js";
import localStorage from "./localStorage.js";
import utils from "../utils/index.js";

const NODE_ENV = process.env.NODE_ENV;

const register = async (req, res) => {
  const { username, email, password, about, image } = req.body;

  try {
    // check if the email is in use
    const exists = await Author.findOne({ email });
    if (exists) return res.status(401).json({ error: "Email already in use." });

    // upload the image to cloudinary if production mode
    let imageSource = image;
    if (NODE_ENV === "production") {
      // allow uploading only if all the fields not empty
      if (!username || !email || !password || !about)
        return res.status(400).json({
          error: "Add all fields then the Image.",
        });
      const imgObj = await cloudinary.uploadImage(image, "author");
      imageSource = {
        url: imgObj.url.toString(),
        public_id: imgObj.public_id.toString(),
      };
    }

    // check error
    const { error } = authorValidations.signupSchema.validate({
      username,
      email,
      password,
      about,
      image: imageSource,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const author = await Author.create({
      username,
      email,
      password: hashPassword,
      about,
      image: JSON.stringify(imageSource),
    });
    const payload = { email, password };
    const token = utils.generateToken(payload);
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

  const { error } = authorValidations.signinSchema.validate({
    email,
    password,
  });

  if (error) {
    return res.status(400).send(error.details[0].message);
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
    const token = utils.generateToken(payload);
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

// TODO: Update Author / Article
const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    // update image
    if (data.image) {
      const author = await Author.findById(id);
      if (author && author.image) {
        if (NODE_ENV === "production") {
          const imgObj = await updateImage(
            "author",
            JSON.parse(author.image).public_id,
            data.image
          );
          data.image = JSON.stringify({
            url: imgObj.url,
            public_id: imgObj.public_id,
          });
        } else {
          localStorage.updateImage("author", author, data.image);
        }
      }
    }
    // check validation errors
    const { error } = authorValidations.updateSchema.validate(data);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const updatedAuthor = await Author.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true }
    );

    return res.status(200).json(updatedAuthor);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await Author.findOneAndDelete({ _id: id });
    if (!author)
      return res.status(401).json({
        msg: "This author with this id either has been deletedd or not exists.",
      });
    console.log(author.image);
    if (NODE_ENV === "production") {
      cloudinary.deleteImage(JSON.parse(author.image).public_id);
    } else {
      localStorage.removeImage("author", author);
    }
    return res.status(200).json({ msg: "Author has been deleted." });
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
