import JWT from "jsonwebtoken";

const generateToken = (payload) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  return JWT.sign(payload, JWT_SECRET, { expiresIn: "3d" });
};

export default {
  generateToken,
};
