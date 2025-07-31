const db = require("../config/db");

function getProfileDetails(cb){
    const sql = `SELECT * FROM profileDetails`;
    db.query(sql,cb);
}

function addProfileDetails(img, name, email, domain, visitedDate, companyName, phoneNumber, Detail, linkedIn, cb) {
    const sql = `INSERT INTO profileDetails (
                 img, name, email, domain, visitedDate, companyName, phoneNumber, Detail, linkedIn
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [img, name, email, domain, visitedDate, companyName, phoneNumber, Detail, linkedIn], cb);
}

function updateUser(uniqeId,data,cb){
    const {img,name, email, domain, visitedDate, companyName, phoneNumber, Detail, linkedIn} = data;
    const sql = `UPDATE profileDetails SET img = ?,name= ?,email = ?,domain = ?,visitedDate = ?,companyName=?,phoneNumber=?,Detail=?,linkedIn=?
    WHERE id = ?`;
    db.query(sql,[img,name, email, domain, visitedDate, companyName, phoneNumber, Detail, linkedIn, uniqeId],cb);
}

function deleteProfileDetails(uniqeId,cb){
    const sql = `DELETE FROM profileDetails WHERE id = ?`;
    db.query(sql,[uniqeId],cb);
}

module.exports = {getProfileDetails,addProfileDetails,updateUser,deleteProfileDetails};