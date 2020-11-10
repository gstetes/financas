const connection = require('../database/connection');

exports.in = async (req, res) => {
  //Recebe dados da movimentação
  const { description, value, account_id } = req.body;

  //Recupera dados da conta
  const accountInfo = await connection('accounts')
    .where('id', account_id)
    .first();

  //Adiciona valor da conta
  await connection('accounts')
    .where('id', account_id)
    .first()
    .update({
      value: (accountInfo.value + value),
    })
    .then(async () => {
      //Cria LOG
      await connection('movimentations')
        .insert({
          type: 'in',
          description,
          value,
          account_id
        })
        .then(() => {
          return res.status(200)
            .json({
              message: 'Moviment has been added.',
            });
        });
    });
};

exports.out = async (req, res) => {
  //Recebe dados da movimentação
  const { description, value, account_id } = req.body;

  //Recupera dados da conta
  const accountInfo = await connection('accounts')
    .where('id', account_id)
    .first();

  //Retira valor da conta
  await connection('accounts')
    .where('id', account_id)
    .first()
    .update({
      value: (accountInfo.value - value),
    })
    .then(async () => {
      //Cria LOG
      await connection('movimentations')
        .insert({
          type: 'out',
          description,
          value,
          account_id
        })
        .then(() => {
          return res.status(200)
            .json({
              message: 'Moviment has been added.',
            });
        });
    });
};