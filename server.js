const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const { createFolderIsNotExist } = require("./helpers");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, async () => {
      await createFolderIsNotExist();
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
