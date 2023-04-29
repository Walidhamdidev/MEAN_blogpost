import Joi from "joi";

const production = process.env.NODE_ENV === "production";

const imageSchema = Joi.object({
  public_id: Joi.string().required(),
  url: Joi.string().required(),
});

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
  about: Joi.string().max(1000).required(),
  image: production ? imageSchema.required() : Joi.string().required(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
});

const updateSchema = Joi.object({
  username: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(255),
  about: Joi.string().max(1000),
  image: production ? imageSchema.required() : Joi.string().required(),
});

export default {
  signupSchema,
  signinSchema,
  updateSchema,
};
