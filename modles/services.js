const mongoose = require('mongoose')

const ServiceSchema = mongoose.Schema({
    img:String,
    title:String,
    des:String,
    ldes:String,
    status:String,
    postdate:Date
})



module.exports=mongoose.model('sevice',ServiceSchema)