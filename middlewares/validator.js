const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30),
      email: Joi.string().pattern(/^\S+@\S+\.\S+$/),
      phone: Joi.string().min(5).max(25),
    }).required();

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        // message: "missing required name field",
        errorCause: validationResult.error.name,
        missingParams: validationResult.error.details[0].path,
        message: validationResult.error.details[0].message,
      });
    }

    next();
  },
  putContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30),
      email: Joi.string().pattern(/^\S+@\S+\.\S+$/),
      phone: Joi.string().min(5).max(25),
    })
      .optional()
      .min(1);

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        // message: "missing required name field",
        errorCause: validationResult.error.name,
        missingParams: validationResult.error.details[0].path,
        message: validationResult.error.details[0].message,
      });
    }

    next();
  },
};
