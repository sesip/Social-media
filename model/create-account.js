const dbConnection= require('../cofig/db-connection')

async function createAccount(userData){
    const {firstName, lastName, userName, email, password, createdAt, fullName, gender
    } = userData

    const query= 'INSERT INTO users (firstName, lastName, userName, email, password, createdAt, FullName, gender) VALUES (?,?,?,?,?,?,?,?)';
    const values= [firstName, lastName, userName, email, password, createdAt, fullName, gender]
    return new Promise((resolve, reject) => {
        dbConnection.query(query, values, (error, result) => {
            if (error) {
                reject( error)
            }
            resolve(result)
        })
    })
}

async function findUserByEmail(email){
    const query= 'SELECT * FROM users WHERE email=?'
    return new Promise((resolve, reject)=>{
        dbConnection.query(query, [email], (error, result)=>{
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
    })
}

async function getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = ?'
    return new Promise((resolve, reject) => {
        dbConnection.query(query, [id], (error, result)=>{
            if(error){
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

module.exports= {
    createAccount,
    findUserByEmail,
    getUserById
}
