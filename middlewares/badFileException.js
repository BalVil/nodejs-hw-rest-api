const badFileException = (req, res, next) => {
  if (!/\.(jpe?g|png|gif|bmp)$/i.test(req?.file?.filename)) {
    return res
      .status(400)
      .send({ message: "No file received or invalid file type" });
  }
  next();
};

module.exports = badFileException;
