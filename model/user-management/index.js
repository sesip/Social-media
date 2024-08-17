const dbConnection = require("../../cofig/db-connection")



async function getUserById(id) {
    const query = 'SELECT id, firstName, lastName, userName, email, gender from users WHERE id = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [id], (error, result)=>{
            if(error){
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

async function updateUserData(email, data){
    const query = 'UPDATE users SET ? WHERE email = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [data, email], (error, result)=>{
            if(error){
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

async function deleteUserData(email){
    const query = 'DELETE FROM users WHERE email = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [email], (error, result)=>{
            if(error){
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}
module.exports= {
    
    getUserById,
    updateUserData,
    deleteUserData

}