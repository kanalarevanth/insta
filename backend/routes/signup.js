const express = require("express");
const Users = require("../model/userlist");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
router.post('/', async function(req, res){
    try{ 
        const {name, email, password } = req.body;
        const finduser = await Users.find({email:email})
        console.log(finduser)
        if (finduser){ 
        const hash = await bcrypt.hash(password, 10)
        const response =await Users.create({name, email, password:hash})
        console.log(response) 
        return res.json({
            status:"success",
            message:"User Created Successful" 
        })
    }else{
        return res.json({
            status:"failed",
            message:"User Already Created" 
        })
    }
    }catch(e) {
        res.status(500).json({
            status:"signup failed",
            error:e.message,
            message:"User Already Created"
        })
    }
})  

module.exports = router

