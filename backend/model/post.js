const mongoose = require("mongoose")
const Schema = mongoose.Schema


const postschema = new Schema({
    user:{type:mongoose.Types.ObjectId, ref: "Users"},
    title:{type:String, require:true, unique:true},
    body:{type:String, require:true, unique:true},
    image:{type:String, require:true}
}) 

const post = mongoose.model('userpost', postschema)
module.exports = post 