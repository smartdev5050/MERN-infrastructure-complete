const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = {
  create,
  login,
};

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    // res.json(token);
    res.status(200).json(token);
  } catch (err) {
    // Probably a dup email
    res.status(400).json({ msg: err.message });
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) throw new Error();
    res.status(200).json(createJWT(user));
  } catch (e) {
    res.status(400).json({ msg: e.message, reason: "Bad Credentials" });
  }
}

/**
// controllers/api/users.js

// Be Sure to add the following
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login
};

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user) );
  } catch {
    res.status(400).json('Bad Credentials');
  }
}
 */
