const authValidation = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401)
      .json({
        message: 'Not authenticate',
      });
  }

  next();
};

module.exports = authValidation;