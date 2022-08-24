const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });

  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }
  if (username === undefined) {
    return response.status(400).json({
      error: "username is required",
    });
  }
  if (password === undefined) {
    return response.status(400).json({
      error: "password is required",
    });
  }
  if (username.length < 3) {
    return response.status(400).json({
      error: "username must contain at least three characters",
    });
  }
  if (password.length < 3) {
    return response.status(400).json({
      error: "password must contain at least three characters",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
