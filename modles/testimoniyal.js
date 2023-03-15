const mongoose = require('mongoose')

const TestmoniyalSchema = mongoose.Schema({
    img:String,
    title:String,
    des:String,
    status:String,
    postdate:Date
})



module.exports=mongoose.model('testmoniyal',TestmoniyalSchema)