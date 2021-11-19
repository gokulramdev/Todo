const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

router.post("/register", async (req, res) => {
  try {
    let { email, password, displayName } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    var userData = await User.findOne({ email: email });
    if (!userData) {
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    }
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const usertoken = jwt.sign(
      { email: userData.email },
      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      }
    );
    res.header("auth", usertoken).json(usertoken);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const VaildUser = (req, res, next) => {
  var token = req.header("auth");
  req.token = token;
  next();
};

router.get("/getAll", VaildUser, async (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const data = await User.find();
      res.json(data);
    }
  });
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

module.exports = router;
