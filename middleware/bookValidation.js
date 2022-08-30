const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().min(2).required(),
  AuthorId: Joi.number().min(1),
  GenreId: Joi.number().min(1),
  isbn: Joi.string().min(10).required(),
});

const updateBookSchema = Joi.object({
  title: Joi.string().when({
    is: Joi.exist(),
    then: Joi.string().min(2),
  }),
  AuthorId: Joi.number().when({
    is: Joi.exist(),
    then: Joi.number().min(1),
  }),
  GenreId: Joi.number().when({
    is: Joi.exist(),
    then: Joi.number().min(1),
  }),
  isbn: Joi.string().when({
    is: Joi.exist(),
    then: Joi.string(),
  }),
});

const validateCreateBody = async (req, res, next) => {
  const { error } = createBookSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

const validateUpdateBody = async (req, res, next) => {
  const { error } = updateBookSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  next();
};

module.exports = { validateCreateBody, validateUpdateBody };
