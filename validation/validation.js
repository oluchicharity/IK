//import hapi joi
const hapijoivalidator= require("@hapi/joi")

//create a function for it

const validatingRegister= (data)=>{
    const validateUser= hapijoivalidator.object({
        name:hapijoivalidator.string().required(),
        age:hapijoivalidator.number().required(),
        phoneNumber:hapijoivalidator.string().required(),
        isAdmin:hapijoivalidator.boolean().required()
    });
    return validateUser.validate(data)
};

const validateLogin= (data)=>{
    const validating= hapijoivalidator.object({
        newPassword: hapijoivalidator.string().required(),
        email:hapijoivalidator.string().required()
    })
    return validating.validate(data)
}

module.exports={validatingRegister,validateLogin }