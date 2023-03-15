const Banner=require('../modles/banner')


exports.adminbannershow=async(req,res)=>{
    const record =await Banner.findOne()
    res.render('admin/banner.ejs',{record})
}

exports.adminbannerupdate=async(req,res)=>{
    const record =await Banner.findOne()
    res.render('admin/bannerupdate.ejs',{record})
}

exports.adminbannerrecord=async(req,res)=>{
    const {title,des,ldes}=req.body
    const data =await Banner.find()
    const id = req.params.id
    if(req.file){
        const img=req.file.filename
        const record =await Banner.findByIdAndUpdate(id,{
            title:title,
        img:img,
        des:des,
        ldes:ldes
        })
    }else{
        const record =await Banner.findByIdAndUpdate(id,{
            title:title,
        des:des,
        ldes:ldes
        })
    }
    res.redirect('/admin/banner')
}