const express = require("express");
const Post = require("../model/post");
const loginuser = require('../model/userlist')
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser ()); 
router.get('/', async function(req, res){ 
    try{
        const userpost = await Post.find();
        return res.json({
            status:"success",
            userpost 
        }) 
        console.log("userpost",userpost)
    }catch(e) {
        res.status(500).json({
            status:"signup failed",
            message:e.message
        })
    }
}) 
router.post('/', async function(req, res){
    try{
        const {title, body, pic} = req.body
        const CreatPost = await Post.create({ 
            title, body, image:pic, user:Authorized_User
        }) 
        return res.json({ 
            status:"success", 
            message:"post created",
            CreatPost 
        })
    }catch(e){
        res.status(500).json({
            status:"Not an authorized user to create/Same Post has been Created",      
            error:e.message,
            message:"Same Post has been Created"
        })
    }
})

router.put('/userpost/:id', async function(req, res){
    try{
        const {title, body, pic} = req.body
        const findpost = await Post.findOne({_id:req.params.id});

        if (!findpost){
            return res.status(404).json({
                status:"Not updated",
                message:"post not created/found"
            })
        }
        if (Authorized_User !== String(findpost.user)){
            return res.status(403).json({
                status:"Not updated",
                message:"Not an authorized user"
            })
        }
        const UpdatePost = await Post.updateOne({_id:req.params.id},{
            title, body, image:pic, user:Authorized_User
        })

        const updatedpost = await Post.findOne({_id:req.params.id});

        return res.json({
            status:"success",
            message:"post Updated",
            updatedpost
        })
    }catch(e){
        res.status(500).json({
            status:"Not an authorized user to update",
            message:e.message
        })
    }
})

router.delete('/userpost/:id', async function(req, res){
    try{
        const {title, body, image} = req.body;
        const findpost = await Post.findOne({_id:req.params.id});
        console.log(findpost) 

        if (!findpost){
            return res.status(404).json({
                status:"Not updated", 
                message:"post not created/found"
            })
        }
        if (Authorized_User !== String(findpost.user)){
            return res.status(403).json({
                status:"Not updated",
                message:"Not an authorized user"
            })
        }
        const CreatPost = await Post.deleteOne({_id:req.params.id},{
            title, body, image
        })

        return res.json({
            status:"success",
            message:"post Deleted",
            findpost 
        })
    }catch(e){
        res.status(500).json({
            status:"Not an authorized user to delete",
            message:"error",
            error:e.message
        })
    }
})

router.get('/userpost', async function(req, res){
    try{
        const findpost = await Post.find({user:Authorized_User});
        console.log("findpost",findpost)
        if (!findpost){
            return res.status(404).json({ 
                status:"Post Not Found",
                message:"post not created/found"
            })
        }
        return res.json({
            status:"success",
            message:"post Updated",
            findpost 
        })
    }catch(e){
        res.status(500).json({
            status:"Not an authorized user to update",
            message:e.message
        })
    }
})
router.get('/userpost/:id', async function(req, res){
    try{
        const findpost = await Post.findOne({_id:req.params.id});
        console.log("findpost",findpost) 

        if (!findpost){
            return res.status(404).json({
                status:"Not updated", 
                message:"post not created/found"
            })
        }
        if (Authorized_User !== String(findpost.user)){
            return res.status(403).json({
                status:"Not updated",
                message:"Not an authorized user"
            })
        }

        return res.json({
            status:"success",
            message:"post",
            findpost
        })
    }catch(e){
        res.status(500).json({
            status:"Not an authorized user to delete",
            message:"error",
            error:e.message
        })
    }
})

module.exports = router

