const fs = require("fs").promises;
const path = require("path");

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

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
