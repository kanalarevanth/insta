const express = require("express");
const Users = require("../model/userlist");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const secret_data = "abcdef123S"

router.post('/', async function(req, res){ 
    try{
        const {email, password } = req.body;
        const user = await Users.findOne({email}) 
        if (!user){ 
            return res.json({
                status:"error",
                message:"Invalid email/User Not Registered",
                data:"error"
            })
        }
        if (await bcrypt.compare(password, user.password)){
            const token = jwt.sign({
                id:user._id, name:user.name
            }, secret_data)
            console.log("token=", token) 
            return res.json({
                status:"success",  
                data: token
            })
        }else{
            return res.json({
                status:"failed",
                message:"Invalid Password",
                data: "error"
            })
        } 
    }
    catch(e){
        res.status(500).json({
            status:"login failed",
            message:e.message
        })
    }
})

module.exports = router