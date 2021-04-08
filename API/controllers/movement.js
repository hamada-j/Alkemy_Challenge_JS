'use strict';

const getAllMovement = pUserId => {

  return new Promise((resolve, reject) => {
    db.query(
      "select * from `movements` where usuario = ? ORDER BY `fecha` DESC",
      [pUserId],
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

const getMovement = pMovementId => {

  return new Promise((resolve, reject) => {
    db.query(
      "select * from `movements` where id = ?",
      [pMovementId],
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

const createMovement = ({ concepto, cantidad, tipo, fecha, usuario }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into movements (concepto, cantidad, tipo, fecha, usuario) values (?,?,?,?,?)",
      [concepto, cantidad, tipo, fecha, usuario],
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


const updateMovement = ({ concepto, cantidad, tipo, usuario, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update movements set concepto = ?, cantidad = ?, tipo = ?, usuario = ? WHERE id = ?",
      [concepto, cantidad, tipo, usuario, id],
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

const deleteMovement = pMovementId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from movements where id = ?",
      [pMovementId],
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



module.exports = {
  getAllMovement: getAllMovement,
  getMovement: getMovement,
  createMovement: createMovement,
  updateMovement: updateMovement,
  deleteMovement: deleteMovement
};

