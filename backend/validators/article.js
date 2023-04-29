import Joi from "joi";

const production = process.env.NODE_ENV === "production";

const imageSchema = Joi.object({
  public_id: Joi.string().required(),
  url: Joi.string().required(),
});

const createSchema = Joi.object({
  title: Joi.string().required(),
  authorId: Joi.string().required(),
  description: Joi.string().required(),
  content: Joi.string().required(),
  image: production ? imageSchema.required() : Joi.string().required(),
  tags: Joi.array().items(Joi.string()).min(1).required(),
});

const updateSchema = Joi.object({
  title: Joi.string(),
  authorId: Joi.string(),
  description: Joi.string(),
  content: Joi.string(),
  image: production ? imageSchema.required() : Joi.string().required(),
  tags: Joi.array().items(Joi.string()).min(1),
}).min(1); // At least one field is required to be updated

export default {
  createSchema,
  updateSchema,
};
