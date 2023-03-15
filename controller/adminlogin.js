const Adminl=require('../modles/Adminlogin')


exports.Adminlrecord=async(req,res)=>{
    const {us,pass} =req.body
    const record = await Adminl.findOne({user:us})
    if(record.user!==null){
        if(record.password==pass){
            req.session.isAuth=true
            res.redirect('/admin/dashbored')
        }else{
            res.redirect('/admin/')
        }
    }else{
        res.redirect('/admin/')
    }
}