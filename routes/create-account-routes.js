const createUserAccount= require('../controller/create-account')
const loginUser= require('../controller/login-controller')
const getUserProfile = require('../controller/user-management/get-user-profile')
const verifyToken = require('../middleware/verify-token')

const express = require("express")
const updateUser = require('../controller/user-management/update-user')
const deleteUser = require('../controller/user-management/delete-user')
const router= express.Router()

router.post("/create-account",createUserAccount)
router.post("/login",loginUser)
router.use(verifyToken)

router.get('/get-user-profile/:id', getUserProfile)
router.post('/update-user-data/:id', updateUser)
router.delete('/delete-user-data/:id', deleteUser)



module.exports=router