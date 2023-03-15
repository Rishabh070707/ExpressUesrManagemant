const router = require('express').Router()
const multer = require('multer')
const cbanner = require('../controller/banner')
const cservices = require('../controller/services')
const ctesti = require('../controller/testimoniyal')
const cquery = require('../controller/query')
const clogin = require('../controller/adminlogin')
const creg = require('../controller/reg')

function handlelogin(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/admin/')
    }
}



const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./public/admin/upload')
    },
    filename:function (req,file,cb){
        cb(null,Date.now() + file.originalname)
    }
})

const upload = multer({
    storage:storage,
    limits:{fileSize:1024*1024*10}
})

router.get('/',async(req,res)=>{
    res.render('admin/adminlogin.ejs',)
})

router.get('/logout',async(req,res)=>{
    req.session.destroy
    res.redirect('/admin/')
})

router.post('/loginrecord/',clogin.Adminlrecord)

router.get('/dashbored',handlelogin,(req,res)=>{
    res.render('admin/dash.ejs')
})

router.get('/banner',handlelogin,cbanner.adminbannershow)

router.get('/bannerdataupdate',handlelogin,cbanner.adminbannerupdate)

router.post('/bannerrecord/:id',upload.single('img'),cbanner.adminbannerrecord)

router.get('/servies',handlelogin,cservices.adminservicesshow)

router.post('/find',handlelogin,cservices.adminservicesfind)

router.get('/addservices',handlelogin,cservices.adminservicesadd)

router.post('/servicerecord',upload.single('img'),cservices.adminservicesrecord)

router.get('/sevicedelete/:id',cservices.adminservicesdelete)

router.get('/sevicestatus/:id',cservices.adminservicesstatus)

router.get('/testimoniyal',handlelogin,ctesti.admintestishow)

router.post('/findtesti',ctesti.admintestifind)

router.get('/testistatus/:id',ctesti.admintestistatus)

router.get('/testidelete/:id',ctesti.admintestidelete)

router.get('/query',handlelogin,cquery.adminqueryshow)

router.get('/querydelete/:id',cquery.adminquerydelete)

router.get('/queryreply/:id',cquery.adminqueryreply)

router.post('/queryrecord/:id',upload.single('img'),cquery.adminqueryrecord)

// ------------------------------------- frontend login start------------------------------------------------


router.get('/userlogin',creg.adminloginshow)


router.get('/userdelete/:id',creg.adminlogindelete)

router.get('/userstatus/:id',creg.adminloginstatus)

router.get('/userrole/:id',creg.adminloginroles)










module.exports=router