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

// Create the table if it doesn't exist
db.transaction(tx => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS workoutRecords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      workoutType TEXT,
      duration TEXT,
      distance TEXT,
      repetitions TEXT,
      selfiePicture TEXT,
      time TEXT  
    );`,
  );
});

export default db;
