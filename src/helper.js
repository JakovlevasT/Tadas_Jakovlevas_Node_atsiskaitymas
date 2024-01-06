const mysql = require('mysql2/promise');
const { dbConfig } = require('./db/config');

async function testConnection() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    await conn.query('SELECT * FROM `posts` LIMIT 1');
    console.log('succesfuly connected to mysql');
  } catch (error) {
    console.log('testConnection failed, did you start XAMPP mate?');
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
}

async function dbQueryWithData(sql, argArr = []) {
  let conn;
  try {
    // prisijungti prie DB
    conn = await mysql.createConnection(dbConfig);
    // atlikti veiksma
    // const sql = 'SELECT * FROM `posts`';
    const [rows] = await conn.execute(sql, argArr);

    // grazinti duomenis
    return [rows, null];
  } catch (error) {
    return [null, error];
  } finally {
    // atsijungti nuo DB
    if (conn) conn.end();
  }
}

module.exports = {
  dbQueryWithData,
  testConnection,
};
