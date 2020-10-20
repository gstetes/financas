const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

//Função para criar um usuário
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
    .then(async (response) => {
      const account_id = crypto.randomBytes(6).toString('HEX');
      await connection('accounts')
        .insert({
          id: account_id,
          user_id: response[0],
          value: 0,
        })
        .then(() => {
          res.status(200)
            .json({ message: 'User has been included.' });
        });
    });
};

//Função para listar todos os usuários
exports.list = async (req, res) => {
  const users = await connection('users')
    .select('*');

  return res.status(200)
    .json(users);
};

//Função para alterar um usuário
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

//Função para deletar um usuário
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