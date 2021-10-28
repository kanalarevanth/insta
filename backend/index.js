const express = require("express");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/usersapi');
const User = require('./model/userlist');
const cors = require('cors'); 
const bodyParser = require("body-parser"); 
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken") 
// dotenv.config()
// mongoose.connect(process.env.MONGO_URL, { 
//     useNewUrlParser:true 
// })
// .then(() => console.log("monogoDB Connected.."))
// .catch((err) => console.log(err)) 

const signuproute = require("./routes/signup");
const loginroute = require("./routes/login");
const userpost=require("./routes/UserPost")
const userupload = require('./routes/UserPost') 

const app = express();
app.use(bodyParser ());
const secret_data = "abcdef123S"

app.use(cors())
app.use('/posts', async function(req, res, next){
    try{
        const token = req.headers.verify?.split(' ')[1];
        if (!token){
            return res.json({
                status:"failed",
                message:"User Not Verified"
            })
        }
        const decode = jwt.verify(token, secret_data)
        if(!decode){
            return res.json({
                status:"failed",
                message:"Invalid token"
            }) 
        }else{
            Authorized_User = decode.id
        }

    }catch(e) {
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
    next()
})  
app.use('/posts/userpost', async function(req, res, next){
    try{
        const token = req.headers.verify?.split(' ')[1];
        if (!token){
            return res.json({
                status:"failed",
                message:"User Not Verified"
            })
        }
        const decode = jwt.verify(token, secret_data)
        if(!decode){
            return res.json({
                status:"failed",
                message:"Invalid token"
            }) 
        }else{
            Authorized_User = decode.id
            console.log("A",Authorized_User) 
        }

    }catch(e) {
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
    next()
})  

app.use('/login', loginroute)
app.use('/signup', signuproute) 
app.use('/posts', userpost)
app.use('/user', userupload) 

app.listen(5000, ()=>console.log("server started")) 