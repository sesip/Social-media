const Joi= require("joi")
const { getUserById, updateUserData} = require("../../model/user-management/index")


async function updateUser(request, response){
    try{
        const schema= Joi.object({
            userName: Joi.string().min(2).message("Must be two character or more").max(30).optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().min(7).optional(),
            gender: Joi.string().valid('male', 'female').optional(),
            bio: Joi.string().optional(),
            avaterUrl: Joi.string().optional()
        }).unknown(false)

        const {error, value}= schema.validate(request.body)

        if(error){
            return response.status(400).json({message: error.details[0].message})
        }
        const userId = request.params.id

        const user = await getUserById(userId)

        if(user.length ===0){
            return response.status(404).json({message: "User not found"})
        }
        console.log(user[0])
        await updateUserData (user[0].email, value)
        
        return response.status(200).json({success: true, message: 'Data has been updated'})

    }catch(error){
        console.log(error)
        response.status(500).json({message: 'An error occured'})

    }
}

module.exports= updateUser