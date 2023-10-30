const User = require("../api/models/user.models");


const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  // const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(String(password));
};


const validateName = (name) => {
  const regex = /[a-zA-Z]{3,30}$/;
  return regex.test(String(name));
};

module.exports = { validatePassword, validateName };
