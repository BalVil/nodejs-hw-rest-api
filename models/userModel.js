const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.base": `{{#label}} should be a type of string`,
    "string.empty": `{{#label}} must contain value`,
    "any.required": `{{#label}} is a required field`,
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": `{{#label}} should be a type of string`,
      "string.email": "{{#label}} must be a valid email",
      "string.empty": `{{#label}} must contain value`,
      "string.pattern.base": `{{#label}} has incorrect format`,
      "any.required": `{{#label}} is a required field`,
    }),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid("starter", "pro", "business")
    .messages({
      "string.empty": `{{#label}} must contain value`,
      "any.required": `{{#label}} is a required field`,
    }),
});

const schemas = {
  registerSchema,
  subscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
