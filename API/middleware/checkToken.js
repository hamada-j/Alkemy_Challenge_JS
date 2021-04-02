'use strict';
const jwt = require("jwt-simple");
const moment = require("moment");


// Modelos de los Middleware

const checkToken = (req, res, next) => {
  
  if (!req.headers["user-token"]) {
    return res.status(431).json({
      message: "debes incluir la cabecera (cabecera)"
    });
  }

  
  const token = req.headers["user-token"];
  
  let payload = null;
  try {
    payload = jwt.decode(token, "process.env.TOKEN");
  } catch (err) {
    return res.status(431).json({
      message: "no se ha podido decodificar le token (decodificar el token)"
    });
  }
  console.log(payload);

  
  const fechaActual = moment().unix();
  if (fechaActual > payload.fechaExpiracion) {
    return res.status(431).json({
      message: "el token esta caducado (fecha de expiracion)"
    });
  }

  req.payload = payload;

  next();
};



module.exports = {
  checkToken: checkToken,
};
