const mongoose = require('mongoose')

const regSchema = mongoose.Schema({
    user:String,
    password:String,
    img:String,
    firstname:String,
    lastname:String,
    mail:String,
    postdate:Date,
    status:String,
    role:String
})



module.exports=mongoose.model('Reg',regSchema)