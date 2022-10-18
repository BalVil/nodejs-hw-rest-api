const fs = require("fs").promises;
const path = require("path");
const jimp = require("jimp");

const { User } = require("../../models/userModel");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const extension = originalname.split(".").pop();
    const fileName = `${_id}.${extension}`;
    const resultUpload = path.join(avatarsDir, fileName);

    const img = await jimp.read(tempUpload);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
