

const jwt = require("jsonwebtoken");
require("dotenv").config();
const Imodel = require("../models/models");
const {validatingRegister} = require("../validation/validation");

const register = async (req, res) => {
  try {
    const { error } = validatingRegister(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const { name, age, phoneNumber, isAdmin } = req.body;

      const user = await Imodel.create({
        name: name,
        age: age,
        phoneNumber: phoneNumber,
        isAdmin: isAdmin,
      });

      return res.status(200).json({ message: "User has been created", data: user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const login= async (req,res)=>{
 try {
    const{name,phoneNumber}=req.body
    const user= await Imodel.findOne({name})
    if(!user){
       return res.status(400).json(`user not found`)
    }
    if(!phoneNumber){
        return res.status(400).json(`phoneNumber not found`)

    }
 const token= jwt.sign({
 userId:user._id,name:user.name}, process.env.SECRET,{expiresIn:"5d"}
 )
 return res.status(200).json({message:`login successsful`,token})
 } catch (error) {
    res.send(error.message)
 }
}


const getAll= async (req,res)=>{
  try {
    const users= await Imodel.find(req.params)
    if(!users){
     return  res.status(400).json(`error finding users`)
    }
    return res.status(200).json({message:`users`, data:users})
    
  } catch (error) {
    res.send(error.message)
  }
}



const update= async(req,res)=>{
  try {
      const userID= req.params.userId

      const user = await Imodel.findById(userID)
      
      if(!user){
      return res.status(404).json({message:` user not found`})
     
    }else{
        const Data = {
          name: req.body.name || user.name,
          phoneNumber: req.body.phoneNumber || user.phoneNumber,
          age:req.body.age || user.age,
          isAdmin:req.body.isAdmin || user.isAdmin,
        
        };
        
        const updatee= await Imodel.findByIdAndUpdate(userID, Data, {new: true});
          res.status(200).json({message:`user${userID} has been found and updated successfully`, data:updatee})
      
}
  } catch (error) {
      res.status(500).json({message:error.message})
  }
}


const admin = async(req,res)=>{
  try {
      const userID= req.params.userId

      const user= await Imodel.findByIdAndUpdate(userID,{isAdmin:true},{new:true})
      if(!user.isAdmin){
          return res.status(404).json(`you are not an authorized personnel`)
      }else{
      return res.status(200).json({message:`welcome admin`, data:user })
      }
  } catch (error) {
      res.send(error.message)
  }
} 


const deleteUser= async (req,res)=>{
try {
  const userID= req.params.userId
  const user= await Imodel.findById(userID)
  if(!user){
    return res.status(404).json({message:` this user cannot deleted`})
  }
  const deleted= await Imodel.findByIdAndDelete(user)

  return res.status(200).json({message:`user has been deleted`, deleted})
  

} catch (error) {
  res.send(error.message)
}
}


module.exports={
  register,login,getAll,update,admin,deleteUser
}





