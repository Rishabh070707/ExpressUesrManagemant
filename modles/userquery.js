const mongoose = require('mongoose')

const querySchema = mongoose.Schema({
    user:String,
    query:String,
    postdate:Date
})



module.exports=mongoose.model('query',querySchema)