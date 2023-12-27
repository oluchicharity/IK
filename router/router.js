const express= require("express")
const{ register, login, getAll, update, admin, deleteUser }=require("../controllers/controller")
const {auth}=require("../middlewareAuth/auth")
const {Admins}=require("../middlewareAuth/auth")
const validate=require("../validation/validation")


const router= express.Router();

router.post("/register", register )
router.post("/login",login)
router.get("/getAll",getAll)
router.put("/update/:userId",Admins,auth,update)
router.put("/admin/:userId",Admins,auth,admin)
router.delete("/delete/:userId",Admins,auth, deleteUser)





module.exports=router