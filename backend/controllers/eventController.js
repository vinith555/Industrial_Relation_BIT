const event = require("../models/eventModel");

exports.getEvent = (req,res)=>{
    event.getEvents((err,result)=>{
        if(err) return res.status(500).send("Unable To Fetch Events");
        res.status(200).send(result);
    });
}

exports.addEvent = (req,res)=>{
    event.addEvent(req.body,(err,result)=>{
        if(err) return res.status(500).send("Error creating event");
        res.status(201).send("Event has been created");
    });
}

exports.deleteEvent = (req,res)=>{
    const id = req.params.id;
    event.deleteEvent(id,(err,result)=>{
        if(err) return res.status(500).send("Error deleting event");
        res.status(200).send("Event Deleted Successfully");
    })
}