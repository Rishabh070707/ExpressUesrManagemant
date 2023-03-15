const Services=require('../modles/services')


exports.adminservicesshow=async(req,res)=>{
    const record = await Services.find().sort({postdate:-1})
    const total = await Services.count()
    const public = await Services.count({status:'public'})
    const unpublic = await Services.count({status:'unpublic'})
    res.render('admin/servies.ejs',{record,total,public,unpublic})
}
exports.adminservicesfind=async(req,res)=>{
    const {search} = req.body
    const record = await Services.find({status:search}).sort({postdate:-1})
    const total = await Services.count()
    const public = await Services.count({status:'public'})
    const unpublic = await Services.count({status:'unpublic'})
    res.render('admin/servies.ejs',{record,total,public,unpublic}) 
}
exports.adminservicesadd=async(req,res)=>{
    // const record = await Services.find()
    res.render('admin/servicesupdate.ejs')
}
exports.adminservicesrecord=async(req,res)=>{
    const {title,des,ldes} = req.body
    const pic =req.file.filename
    const record = new Services({
        title:title,
        img:pic,
        des:des,
        ldes:ldes,  
        status:'unpublic',
        postdate:new Date()
    })
   record.save()
    res.redirect('/admin/servies')
}
exports.adminservicesdelete=async(req,res)=>{
    const id =   req.params.id
    const record =  await Services.findByIdAndDelete(id)
    res.redirect('/admin/servies')
}
exports.adminservicesstatus=async(req,res)=>{
    const id =   req.params.id
    const record = await Services.findById(id)
    let newstatus = null
    if(record.status=='unpublic'){
        newstatus='public'
    }else{
        newstatus='unpublic'
    }
    await Services.findByIdAndUpdate(id,{
    status:newstatus,
 })
 res.redirect('/admin/servies')
}