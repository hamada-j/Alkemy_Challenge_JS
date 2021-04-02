'use strict';

const fs = require("fs");

const generate = require("../utils/generateID");

const registerAction = (req, res, next) => {
  fs.appendFileSync(
    "logs/userActions.log",
    `${generate()} ---> Método: ${req.method}. Url: ${req.url}. Email: ${req.body.email}. Host: ${req.headers.host}\n`
  );  
  next();
};

module.exports = {
  registerAction: registerAction
};
