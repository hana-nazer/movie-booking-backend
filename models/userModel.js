const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')
 const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        requires:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
 },{
    timestamps:true
 })

 module.exports = mongoose.model('User',userSchema)
//  User-collection name , userSchema value will be in User collection