const {createAccount, findUserByEmail, getUserById} = require('../model/create-account')
const bcrypt = require("bcrypt")
const e = require('express')
const Joi= require("joi")

async function createUserAccount(request, response){
    //const userData= request.body
    try{
        //Validate user data
        const schema= Joi.object({
            firstName: Joi.string().min(2).message("Must be two character or more").max(30).required(),
            lastName: Joi.string().min(2).message("Must be two character or more").max(30).required(),
            userName: Joi.string().min(2).message("Must be two character or more").max(30).optional(),
            email: Joi.string().email().required(),
            password: Joi.string().min(7).required(),
            gender: Joi.string().valid('male', 'female').required()
        }).unknown(false)
    
        const {error, value}= schema.validate(request.body)

        if(error){
            return response.status(400).json({message: error.details[0].message})
        }

        const userData= value

        //Hash user password
        const hashPassword= await bcrypt.hash(userData.password, 10)
        //assigning user password to the hashpassword
        userData.password= hashPassword

        //adding createdAt date to user data
        const createdAt= new Date()
        userData.createdAt= createdAt

        //Concatinating firstName to LastName
        const fullName= userData.firstName + ' ' + userData.lastName
        userData.fullName= fullName

        //check if email user is registering with exist
        const existingUser= await findUserByEmail(userData.email)
        if(existingUser.length !== 0){
            return response.status(400).json({message: "Email already exist, try another one"})
        }

        //sve user data to the DB
        const createdUser = await createAccount(userData)
        const createdUserDetails = await getUserById(createdUser.insertId)
        response.status(201).json({
           success: true, 
           message: "Account created successfully",
           createdUserDetails
          })
       } catch (error) {
        console.log(error)
        return response.status(500).json({ message: "Internal server error"})
       }
}

module.exports= createUserAccount