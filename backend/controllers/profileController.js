const profileDetail = require("../models/profileDetailsModel");

exports.getProfileDetail = (req,res)=>{
    profileDetail.getProfileDetails((err,result)=>{
        if(err) return res.status(500).send("Unable To Fetech User Details");
        res.status(200).json(result);
    });
}


exports.addProfileDetail = (req, res) => {
  const img = req.file?.filename; 
  const { name, email, domain, visitedDate, companyName, phoneNumber, detail, linkedIn } = req.body;

  if (!img) {
    return res.status(400).send("No image uploaded");
  }

  profileDetail.addProfileDetails(
    img, name, email, domain, visitedDate, companyName, phoneNumber, detail, linkedIn,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error Creating User");
      }
      res.status(201).send("User Created Successfully");
    }
  );
};


exports.updateProfileDetails = (req, res) => {
  const id = req.params.id;

 const img = req.file?.filename; 
 const { name, email, domain, visitedDate, companyName, phoneNumber, detail, linkedIn } = req.body;

  profileDetail.updateUser(id,img, name, email, domain, visitedDate, companyName, phoneNumber, detail, linkedIn, 
    (err, result) => {
    if (err){
      console.error(err);
      return res.status(500).send("Error updating user");
    } 
    res.status(200).send("User updated successfully");
  });
};


exports.deleteProfileDetail = (req,res)=>{
    const id = req.params.id;  // extract from URL
    profileDetail.deleteProfileDetails(id, (err, result) => {
        if(err) return res.status(500).send("Unable to delete user");
        res.status(200).send("Deleted successfully");
    });
};
