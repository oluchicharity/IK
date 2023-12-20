const express= require("express")
const{ register, login, getAll, update, admin, deleteUser }=require("../controllers/controller")
const auth=require("../middlewareAuth/auth")
const validating=require("../validation/validation")


const router= express.Router();

router.post("/register", register )
router.post("/login",login)
router.get("/getAll",getAll)
router.put("/update/:userId",auth,update)
router.put("/admin/:userId",auth,admin)
router.delete("/delete/:userId", auth, deleteUser)





module.exports=router