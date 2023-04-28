import customConfig from "config";

export default function config(app) {
  if (!customConfig.get("JWT_SECRET")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }

  if (!customConfig.get("MONGO_URI")) {
    throw new Error("FATAL ERROR: db is not defined.");
  }
}
