const express= require("express");
const app= express();
app.use(express.json());
const port= 6009
require("./dbconfig/config")
const router= require("./router/router")

app.get("/Api/v1",(req,res)=>{
 res.send(`welcome to my API`)
})
app.use("/Api/v1",router)


app.listen(port,()=>{
    console.log(`listening on port:${port}`)
})