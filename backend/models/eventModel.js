const db = require("../config/db");

function getEvents(cb){
    const sql = `SELECT * FROM events`;
    db.query(sql,cb);
}

function addEvent(data,cb){
    const {guestName, eventName, eventDate}=data;
    const sql = `INSERT INTO events (guestName, eventName, eventDate) VALUES (?,?,?)`
    db.query(sql,[guestName, eventName, eventDate],cb);
}

// function updateEvent(uniqeId,data,cb){
//     const {guestName, eventName, eventDate} = data;
// }

function deleteEvent(uniqeId,cb){
    const sql = `DELETE FROM events WHERE id = ?`;
    db.query(sql,[uniqeId],cb);
}

module.exports = {addEvent,getEvents,deleteEvent};