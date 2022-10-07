const { User } = require("../../models/userModel");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  res.json(result);
};

module.exports = updateSubscription;
