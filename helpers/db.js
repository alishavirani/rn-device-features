import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("places.db"); //connects or creates a db

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        [],
        () => {
          resolve();
        }, //SUCCESS
        (_, err) => {
          reject();
        } //ERROR
      );
    });
  });
  return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        "INSERT INTO places(title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)",
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result);
        }, //SUCCESS
        (_, err) => {
          reject(err);
        } //ERROR
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(txn => {
          txn.executeSql(
            "SELECT * FROM places",
            [],
            (_, result) => {
              resolve(result);
            }, //SUCCESS
            (_, err) => {
              reject(err);
            } //ERROR
          );
        });
      });
      return promise;
}
