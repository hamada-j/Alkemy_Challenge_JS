'use strict';

const updatePassword = ({ usuario, email, password, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update users set usuario = ?, email = ?, password = ? WHERE id = ?",
      [usuario, email, password, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};


const findByEmail = pEmail => {

  return new Promise((resolve, reject) => {
    db.query(
      "select * from `users` where email = ?",
      [pEmail],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows.length === 0) {
            resolve(null);
          } else {
            resolve(rows);
          }
        }
      }
    );
  });

};

module.exports = {
  updatePassword: updatePassword,
  findByEmail: findByEmail
};

