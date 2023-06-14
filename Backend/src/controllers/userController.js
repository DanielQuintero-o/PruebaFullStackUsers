const userService = require("../services/userService");

const getAllUsers = (req, res) => {
  const { mode } = req.query;
  try {
    const allUsers = userService.getAllUsers({ mode });
    res.send({ status: "OK", data: allUsers });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneUser = (req, res) => {
  const {
    params: { userId },
  } = req;

  if (!userId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':userId' can not be empty" },
    });
    return;
  }

  try {
    const user = userService.getOneUser(userId);
    res.send({ status: "OK", data: user });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewUser = (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.document ||
    !body.email ||
    !body.image ||
    !body.address ||
    !body.telephone
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request",
      },
    });
  }

  const newUser = {
    name: body.name,
    document: body.document,
    email: body.email,
    image: body.image,
    address: body.address,
    telephone: body.telephone,
  };

  try {
    const createdUser = userService.createNewUser(newUser);
    res.status(201).send({ status: "OK", data: createdUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const updateOneUser = (req, res) => {
  const {
    body,
    params: { userId },
  } = req;

  if (!userId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':userId' can not be empty" },
    });
  }

  try {
    const updatedUser = userService.updateOneUser(userId, body);
    res.send({ status: "OK", data: updatedUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneUser = (req, res) => {
  const {
    params: { userId },
  } = req;

  if (!userId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':userId' can not be empty" },
    });
  }

  try {
    userService.deleteOneUser(userId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};