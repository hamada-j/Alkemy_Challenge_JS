'use strict';

const UserModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const User = sequelize.define('User', {
        UserId: {type: INTEGER, primaryKey: true, autoIncrement: true},
        Username: {type: STRING, primaryKey: false, allowNull: false},
        Password: STRING
    })
    return User
}

const create = ({ usuario, email, password }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into users ( usuario, email, password) values (?,?,?)",
      [ usuario, email, password ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const emailExists = pEmail => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from users where email = ?",
      [pEmail],
      (err, rows) => {
        if (err) return reject(err);
        if (rows.length === 0) return resolve(null);
        resolve(rows[0]);
      }
    );
  });
};

const nameExists = pName => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from users where usuario = ?",
      [pName],
      (err, rows) => {
        if (err) return reject(err);
        if (rows.length === 0) return resolve(null);
        resolve(rows[0]);
      }
    );
  });
};

module.exports = {
  create: create,
  emailExists: emailExists,
  nameExists: nameExists,
  UserModel: UserModel
};



