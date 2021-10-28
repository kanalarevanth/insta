const mongoose = require("mongoose")
const Schema = mongoose.Schema 

const users = new Schema({
    name:{type:String, require:true, unique:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true} 
}) 

const Users = mongoose.model('Users', users) 
module.exports = Users