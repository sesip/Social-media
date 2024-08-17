const { getUserById} = require("../../model/user-management/index")


async function getUserProfile(request, response){
    try{
         
        const userId = request.params.id

        const user = await getUserById(userId)

        if(user.length ===0){
            return response.status(404).json({message: "User not found"})
        }
        return response.status(200).json({success: true, data:user})

    }catch(error){
        console.log(error)
        response.status(500).json({message: 'An error occured'})

    }
}

module.exports= getUserProfile