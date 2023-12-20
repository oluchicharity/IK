const mongoose= require("mongoose")

const dbhost= "localhost:27017"

const dbname= "Adminprivileges"

mongoose.connect(`mongodb://${dbhost}/${dbname}`).then(()=>{
    console.log(`connected to mongoose `)
}).catch((error)=>{
    console.log(error.message)
})
