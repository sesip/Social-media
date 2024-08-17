const Joi= require("joi")
const { getUserById, updateUserData, deleteUserData} = require("../../model/user-management/index")


async function deleteUser(request, response){
    try{

        const userId = request.params.id

        const user = await getUserById(userId)

        if(user.length ===0){
            return response.status(404).json({message: "User not found"})
        }
        const {id} =request.user
        console.log(id)

        if(Number(user[0].id) != id){
            return response.status(400).json({message: 'You cannot delete this user, check user ID'})
        }
        await deleteUserData(user[0].email)
        
        return response.status(200).json({success: true, message: 'Data has been deleted'})

    }catch(error){
        console.log(error)
        response.status(500).json({message: 'An error occured'})

    }
}

module.exports= deleteUser