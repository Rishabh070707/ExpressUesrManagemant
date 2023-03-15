const mongoose = require('mongoose')

const BannerSchema = mongoose.Schema({
    title:String,
    img:String,
    des:String,
    ldes:String
})



module.exports=mongoose.model('banner',BannerSchema)