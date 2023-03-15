const mongoose = require('mongoose')

const loginSchema = mongoose.Schema({
    user:String,
    password:String
})



module.exports=mongoose.model('login',loginSchema)