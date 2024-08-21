require('dotenv').config()
const express = require("express")
const app = express()
const port= 3000
const router= require('./routes/create-account-routes')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.get("/test", (request, response)=>{
//    return response.status(200).json({
//         error: false,message: "Sucess"
        
//     })
// })
app.use('/api', router)
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})