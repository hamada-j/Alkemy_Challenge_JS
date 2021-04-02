'use strict';

const moment = require("moment");
const jwt = require("jwt-simple");

const createToken = pUser => {

  const payload = {
    usuarioId: pUser.id,
    fechaCreacion: moment().unix(),
    fechaExpiracion: moment()
      .add(15, "minutes")
      .unix()
  };

  return jwt.encode(payload, "process.env.TOKEN");
};

module.exports = createToken;