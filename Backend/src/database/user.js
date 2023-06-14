const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllUsers = (filterParams) => {
  try {
    let users = DB.users;
    if (filterParams.mode) {
      return DB.users.filter((user) =>
        user.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    return users;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneUser = (userId) => {
  try {
    const user = DB.users.find((user) => user.id === userId);

    if (!user) {
      throw {
        status: 400,
        message: `Can't find user with the id '${userId}'`,
      };
    }

    return user;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewUser = (newUser) => {
  try {
    const isAlreadyAdded =
      DB.users.findIndex((user) => user.email === newUser.email) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `user with the email '${newUser.email}' already exists`,
      };
    }

    DB.users.push(newUser);
    saveToDatabase(DB);

    return newUser;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneUser = (userId, changes) => {
  try {
    const isAlreadyAdded =
      DB.users.findIndex((user) => user.name === changes.name) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `user with the name '${changes.name}' already exists`,
      };
    }

    const indexForUpdate = DB.users.findIndex(
      (user) => user.id === userId
    );

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find user with the id '${userId}'`,
      };
    }

    const updatedUser = {
      ...DB.users[indexForUpdate],
      ...changes,
    };

    DB.users[indexForUpdate] = updatedUser;
    saveToDatabase(DB);

    return updatedUser;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneUser = (userId) => {
  try {
    const indexForDeletion = DB.users.findIndex(
      (user) => user.id === userId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find user with the id '${userId}'`,
      };
    }
    DB.users.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};