const connection = require('../database/connection');

exports.in = async (req, res) => {
  //Recebe dados da movimentação
  const { description, value, account_id } = req.body;

  //Recupera dados da conta
  const accountInfo = await connection('accounts')
    .where('id', account_id)
    .first();

  try {
    //Retira valor da conta
    await connection('accounts')
      .where('id', account_id)
      .first()
      .update({
        value: Number.parseFloat(accountInfo.value) + value,
      })
      .then(async () => {
        //Cria LOG
        await connection('movimentations')
          .insert({
            type: 'in',
            description,
            value,
            account_id,
            date: Date.now(),
          })
          .then(() => {
            return res.status(200)
              .json({
                message: 'Moviment has been added.',
              });
          });
      });
  } catch (error) {
    return res.status(400)
      .json(error);
  }
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
      value: Number.parseFloat(accountInfo.value) - value,
    })
    .then(async () => {
      //Cria LOG
      await connection('movimentations')
        .insert({
          type: 'out',
          description,
          value,
          account_id,
          date: Date.now(),
        })
        .then(() => {
          return res.status(200)
            .json({
              message: 'Moviment has been added.',
            });
        });
    });
};



exports.list = async (req, res) => {
  const moviments = await connection('movimentations')
    .select('*');

  if (!moviments) {
    return res.status(400)
      .json({
        message: 'No items to view.'
      });
  };

  return res.status(200)
    .json(moviments);
};