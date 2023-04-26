import Author from "../models/author.js";
import JWT from "jsonwebtoken";
import config from "config";
import bcrypt from "bcrypt";

const generateToken = (payload) => {
  const JWTSecret = config.get("JWT_SECRET");
  const token = JWT.sign(payload, JWTSecret, { expiresIn: "3d" });
  return token;
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ error: "Please enter email and password" });

  try {
    const author = await Author.findOne({ email });
    if (!author)
      return res
        .status(404)
        .json({ erorr: "There is no author with this email." });

    if (!bcrypt.compare(password, author.password))
      return res
        .status(404)
        .json({ erorr: "There is no author with this password." });

    const payload = { email, password };
    const token = generateToken(payload);
    return res.status(200).json({ author: { token, email } });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  const { username, email, password, photo } = req.body;

  if (!username)
    return res.status(400).json({ error: "Please enter username." });
  if (!email) return res.status(400).json({ error: "Please enter email." });
  if (!password)
    return res.status(400).json({ error: "Please enter password." });
  if (!photo) return res.status(400).json({ error: "Please add photo." });

  try {
    const exists = await Author.findOne({ email });
    if (exists) return res.status(401).json({ error: "Email already in use." });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);

    await Author.create({ username, email, hashPassword, photo });
    const payload = { email, password };
    const token = generateToken(payload);
    return res.status(200).json({
      author: {
        token,
        email,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export default {
  login,
  register,
};
