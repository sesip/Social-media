const bcrypt = require("bcrypt")
const { request, response } = require("express")
const Joi= require("joi")
const { findUserByEmail } = require("../model/create-account")
const { merge } = require("../routes/create-account-routes")
const jwt= require('jsonwebtoken')

const login= async(request, response)=>{
    try{
        const schema= Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        }).unknown(false)

        const {error, value} = schema.validate(request.body)

        if(error){
            return response.status(400).json({message: error.details[0].message})
        }

        const userData= value
        const existingEmail= await findUserByEmail(userData.email)
        if(!existingEmail || existingEmail.length === 0){
            return response.status(404).json({message: 'This email does not exist'})
        }

        const match = await bcrypt.compare(userData.password, existingEmail[0].password)

        if(!match){
            return response.status(401).json({message: 'Invalid password'})
        }
           const user= {
            email: userData.email, 
            id: existingEmail[0].id
           }
           console.log(existingEmail[0])
           const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: "1h"})
        return response.status(200).json({
            message: 'Login successful',
            token            
        })

    

    }catch(error){
        console.log(error)
        response.status(500).json({message: 'An error occured'})

    }
    

}

module.exports = login