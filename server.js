var express = require('express');  
require('dotenv').config() 
var app = express();  
//const cookieParser = require('cookie-parser')
//const morgan = require('morgan')

//express middlewares
app.use(express.json({extended: false}))
app.use(express.urlencoded())
//app.use(cookieParser)

app.use(function (req, res, next) {  
    res.setHeader('Content-Type', 'application/json')
 res.header("Access-Control-Allow-Origin", "*");  
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');  
next();  
});  

//app.use(morgan('dev'))

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

// process.on('uncaughtException', function (err) {
//     console.log(err);
//     //server.close
// }); 