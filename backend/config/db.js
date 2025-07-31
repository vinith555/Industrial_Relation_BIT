const db = require("mysql2");

const con = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5114',
    database: 'industrialRelationsBit'
});

con.connect((err)=>{
    if(err) throw err;
    console.log("connected to db");
})
module.exports = con;