const connection = require('../database/connection');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  console.log(name, email, password, confirmPassword);
};