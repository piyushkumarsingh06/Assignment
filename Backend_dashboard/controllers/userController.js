const User = require("../models/userModel");

exports.getProfile = (req, res) => {
  User.findById(req.user.id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};
