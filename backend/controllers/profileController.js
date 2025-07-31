const profileDetail = require("../models/profileDetailsModel");

exports.getProfileDetail = (req,res)=>{
    profileDetail.getProfileDetails((err,result)=>{
        if(err) return res.status(500).send("Unable To Fetech User Details");
        res.status(200).send(result);
    });
}

exports.addProfileDetail = (req,res)=>{
    const {img,name, email, domain, visitedDate, companyName, phoneNumber, detail, linkedIn} = req.body;
    // console.log(req.body);
    
    profileDetail.addProfileDetails(img,name, email, domain, visitedDate, companyName, phoneNumber, detail, linkedIn,(err,result)=>{
        if(err){
            console.log(err);
            
            return res.status(500).send("Error Creating User");
        }
        res.status(201).send("User Created Successfully");
    });
}

exports.updateProfileDetails = (req,res)=>{
    const id = req.params.id;
    profileDetail.updateUser(id,req.body,(err,result)=>{
        if(err) return res.status(500).send("Error Updating User");
        res.status(200).send("User Updated");
    });
}

exports.deleteProfileDetail = (req,res)=>{
    const id = req.params.id;  // extract from URL
    profileDetail.deleteProfileDetails(id, (err, result) => {
        if(err) return res.status(500).send("Unable to delete user");
        res.status(200).send("Deleted successfully");
    });
};
