const Reg=require('../modles/login/reg')



exports.frontendsave=async(req,res)=>{
    const {us,pass} =  req.body
      const record = new Reg({
          user:us,
          password:pass,
          img:'',
          firstname:'',
          lastname:'',
          mail:'',
          postdate:new Date(),
          status:'active',
          role:'public'
      })
      await record.save()
      res.redirect('/login')
}
exports.frontendudate=async(req,res)=>{
    const {fname,lname,mail} = req.body
    const id = req.params.id
    console.log(id)
    if(req.file){
        const img = req.file.filename
        const record = await Reg.findByIdAndUpdate(id,{
            img:img,
            firstname:fname,
            lastname:lname,
            mail:mail,
        })
    }else{
        const record = await Reg.findByIdAndUpdate(id,{
            firstname:fname,
            lastname:lname,
            mail:mail,
        })
    }
    res.redirect('/profile')
}
exports.adminloginshow=async(req,res)=>{
    const record = await Reg.find()
    res.render('admin/userlogin.ejs',{record})
}
exports.adminlogindelete=async(req,res)=>{
    const id =   req.params.id
    const record =  await Reg.findByIdAndDelete(id)
    res.redirect('/admin/userlogin')
}
exports.adminloginstatus=async(req,res)=>{
    const id =   req.params.id
    const record =  await Reg.findById(id)
    newstatus=null
    if(record.status=='active'){
        newstatus='suspended'
    }else{
        newstatus='active'
    }
    await Reg.findByIdAndUpdate(id,{status:newstatus})
    res.redirect('/admin/userlogin')
}
exports.adminloginroles=async(req,res)=>{
    const id =   req.params.id
    const record =  await Reg.findById(id)
    newstatus=null
    if(record.role=='public'){
        newstatus='pvt'
    }else{
        newstatus='public'
    }
    await Reg.findByIdAndUpdate(id,{role:newstatus})
    res.redirect('/admin/userlogin')
}