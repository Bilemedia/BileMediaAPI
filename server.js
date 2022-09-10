var express = require('express');  
require('dotenv').config() 
 
const getPort = require('get-port')
const bodyFormat = require('./body.json')
const app = express(); 
//express middlewares
app.use(express.json({extended: false}))
app.use(express.urlencoded())

app.use(function (req, res, next) {  
    res.setHeader('Content-Type', 'application/json')
 res.header("Access-Control-Allow-Origin", "*");  
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');  
next();  
});  

app.get('/', (req, res) => {
   
    return res.send(bodyFormat)
})
// import routes 
const subscribtionRoute = require('./routes/subscribtion')
//const authRoute = require('./routes/auth')

//route middlewares
app.use('/subscribtion', subscribtionRoute)  
//app.use('/', authRoute)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {  
console.log(`Server started on PORT: ${process.env.PORT}`);  
});  

