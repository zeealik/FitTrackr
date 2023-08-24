import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'fittrackr.db',
    location: 'default',
  },
  () => {},
  error => {
    console.error('Error opening database: ', error);
  },
);

// Create a table for users
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT)',
    [],
    () => {},
    error => {
      console.error('Error creating users table: ', error);
    },
  );
});

export const checkLogin = async (email, password) => {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (_, result) => {
          if (result.rows.length > 0) {
            const user = result.rows.item(0);
            resolve(user);
          } else {
            resolve(null);
          }
        },
        error => {
          console.error('Error checking user credentials: ', error);
          resolve(null);
        },
      );
    });
  });
};

export default db;
