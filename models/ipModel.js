const db = require('./db');

const ipModel = {
  insertSearch: (ip, data) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO searches (ip, data) VALUES (?, ?)';
      db.query(query, [ip, data], (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = ipModel;