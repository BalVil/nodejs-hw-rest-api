const fs = require("fs").promises;
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "../", "tmp");

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};
const createFolderIsNotExist = async () => {
  if (!(await isAccessible(UPLOAD_DIR))) {
    await fs.mkdir(UPLOAD_DIR);
  }
};

module.exports = createFolderIsNotExist;
