const bcrypt = require("bcrypt");
const db = require("../config/db");

async function register(name, email, password, role, cb) {
  const hashed = await bcrypt.hash(password, 10);
  const sql = `INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)`;
  db.query(sql, [name, email, hashed, role], cb);
}

function login(email, cb) {
  const sql = `SELECT * FROM users WHERE email = ?`;
  db.query(sql, [email], cb);
}

module.exports = { register, login };
