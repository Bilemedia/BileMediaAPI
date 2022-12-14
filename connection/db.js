require('dotenv').config()

// DB.js config for your database  
const sql = require('mssql')  
const config = {  
 user: process.env.SQL_USER,  
password: process.env.SQL_PASSWORD,  
server: process.env.SERVER,  
database: process.env.DATABASE,
//authentication: { type: 'default', options: { userName: process.env.SQL_USER, password: process.env.SQL_PASSWORD } },
options: {
    trustedConnection: true,
    encrypt: false,
    trustServerCertificate: true,

  },  
}  
const poolPromise = new sql.ConnectionPool(config)  
.connect()  
.then(pool => {  
console.log('Connected to MSSQL')  
return pool  
})  
.catch(err => console.log('Database Connection Failed! Bad Config: ', err))  
module.exports = {  
sql, poolPromise  
}  