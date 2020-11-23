const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.create = async (req, res) => {
  //Receber email e senha do usuário
  const { email, password } = req.body;

  //Pesquisar usuário
  const user = await connection('users')
    .select('*')
    .where('email', email)
    .first();

  //Validar e-mail do usuário
  if (!user) {
    return res.status(400)
      .json({
        message: "Account not exists.",
      });
  };

  //Validar credenciais
  bcrypt.compare(password, user.password, function (err, result) {
    if (!result) {
      return res.status(400)
        .json({
          message: "Invalid password",
          err,
        });
    }

    //Autenticar usuário
    const token = crypto.randomBytes(6).toString('hex')

    return res.status(200)
      .json({
        user_id: user.id,
        username: user.name,
        token,
      });
  });
};