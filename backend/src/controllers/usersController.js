const connection = require('../database/connection');
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
  //Receber dados do usuário
  const { name, email, password, confirmPassword } = req.body;

  //Checar existência do e-mail no banco de dados
  const userExists = await connection('users')
    .select('*')
    .where('email', email)
    .first();

  //Retornar erro caso exista
  if (userExists) {
    return res.status(400)
      .json({ error: "E-mail already use!" });
  };

  let hashPassword = null;

  //Criptografar senha do usuário
  if (password === confirmPassword) {
    hashPassword = await bcrypt.hash(password, 16);
  } else {
    return res.status(400)
      .json({
        message: "Password and confirm password not match!"
      })
  };

  //Adiciona usuário ao banco de dados
  await connection('users')
    .insert({
      name,
      email,
      password: hashPassword
    })
    .then(() => {
      return res.status(200)
        .json({
          message: "User has been inserted."
        });
    });
};

exports.list = async (req, res) => {
  const users = await connection('users')
    .select('*');

  return res.status(200)
    .json(users);
};

exports.update = async (req, res) => {
  //Receber novos dados do usuário
  const { name, email, password, confirmPassword } = req.body;

  //Verificar se o usuário existe
  const userExists = await connection('users')
    .select('*')
    .where('email', email)
    .first();

  if (!userExists) {
    return res.status(200)
      .json({
        message: 'This user not exists!',
      });
  };

  //Verificar se as senhas conferem
  let hashPassword = null;

  if (password === confirmPassword) {
    hashPassword = await bcrypt.hash(password, 16);
  };

  //Atualizar o usuário no banco de dados
  await connection('users')
    .select('*')
    .where('email', email)
    .update({
      name,
      email,
      password: hashPassword,
    })
    .then(() => {
      return res.status(200)
        .json({
          message: 'User has been updated!',
        });
    });
};

exports.delete = async (req, res) => {
  //Receber e-mail do usuário
  const { email } = req.body;

  //Verificar existência do usuário
  const userExists = await connection('users')
    .select('*')
    .where('email', email)
    .first();

  if (!userExists) {
    return res.status(400)
      .json({
        message: 'User not exists!',
      });
  };

  //Deletar usuário
  await connection('users')
    .select('*')
    .where('email', email)
    .first()
    .delete()
    .then(() => {
      return res.status(200)
        .json({
          message: 'User has been deleted.',
        });
    });
};