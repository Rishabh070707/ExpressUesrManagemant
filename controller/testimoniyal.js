const Testi=require('../modles/testimoniyal')


exports.admintestishow=async(req,res)=>{
    const record = await Testi.find().sort({postdate:-1})
    const total = await Testi.count()
    const public = await Testi.count({status:'hide'})
    const unpublic = await Testi.count({status:'show'})
    res.render('admin/testimoniyal.ejs',{record,total,public,unpublic})
}
exports.admintestifind=async(req,res)=>{
    const {search} = req.body
    const record = await Testi.find({status:search}).sort({postdate:-1})
    const total = await Testi.count()
    const public = await Testi.count({status:'hide'})
    const unpublic = await Testi.count({status:'show'})
    res.render('admin/testimoniyal.ejs',{record,total,public,unpublic}) 
}
exports.admintestistatus=async(req,res)=>{
    const id = req.params.id
    const record = await Testi.findById(id)
    let newstatus =null
    if(record.status=='hide'){
        newstatus = 'show'
    }else{
        newstatus = 'hide'
    }
    await Testi.findByIdAndUpdate(id,{status:newstatus})
    res.redirect('/admin/testimoniyal')
}
exports.admintestidelete=async(req,res)=>{
    const id =req.params.id
    const record = await Testi.findByIdAndDelete(id)
    res.redirect('/admin/testimoniyal')
}

exports.frontendrecord=async(req,res)=>{
    const {title,des} = req.body
    const img = req.file.filename
   const record = new Testi({
        img:img,
        title:title,
        des:des,
        status:'hide',
        postdate:new Date()
    }) 
    await record.save()
    res.redirect('/')
}