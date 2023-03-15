const router = require('express').Router()
const multer = require('multer')
const Banner = require('../modles/banner')
const Services = require('../modles/services')
const Testi = require('../modles/testimoniyal')
const ctesti = require('../controller/testimoniyal')
const cquery = require('../controller/query')
const creg = require('../controller/reg')
const Query = require('../modles/userquery')
const Reg = require('../modles/login/reg')

function handleLogin(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/login')
    }
}

function handlerole(req,res,next){
    if(sess.role=='pvt'){
        next()
    }else{
        res.send('not for free users')
    }
}

let sess=null

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./public/frontend/upload')
    },
    filename:function (req,file,cb){
        cb(null,Date.now() + file.originalname)
    }
})

const upload = multer({
    storage:storage,
    limits:{fileSize:1024*1024*10}
})

router.get('/',handleLogin,async(req,res)=>{
    const Bannerrecord = await Banner.findOne()
    const Servicerecord = await Services.find({status:'public'})
    const Testierecord = await Testi.find({status:'show'})
    if(sess!==null){
        res.render('frontend/index.ejs',{Bannerrecord,Servicerecord,Testierecord,use:sess.user})
    }else{
        res.render('frontend/index.ejs',{Bannerrecord,Servicerecord,Testierecord,use:'notforyou'})
    }
})

router.get('/ldes',async(req,res)=>{
    const record = await Banner.findOne()
    if(sess!==null){
        res.render('frontend/ldes.ejs',{use:sess.user,record})
    }else{
        res.render('frontend/ldes.ejs',{use:'notforyou',record})
    }
})

router.get('/testimoniyal',handlerole,async(req,res)=>{
    const record = await Reg.find()
    if(sess!==null){
        res.render('frontend/testimoniyal.ejs',{use:sess.user,record})
    }else{
        res.render('frontend/testimoniyal.ejs',{use:'notforyou'})
    }
})

router.post('/testmoniyalrecord',upload.single('img'),ctesti.frontendrecord)

router.post('/userquery',cquery.frontendsave)

// ----------------------------------------Registrition starts-------------------------------------------------------------

router.get('/reg',(req,res)=>{
    res.render('frontend/reg.ejs')
    if(sess!==null){
        res.render('frontend/reg.ejs',{use:sess.user})
    }else{
        res.render('frontend/reg.ejs',{use:'notforyou'})
    }
    
})

router.post('/regrecord',creg.frontendsave)

router.get('/login',async(req,res)=>{
    const record = await Reg.findOne()
    if(sess!==null){
        res.render('frontend/login.ejs',{record,use:sess.user})
    }else{
        res.render('frontend/login.ejs',{record,use:'notforyou'})
    }
})

router.post('/loginrecord/:id',async(req,res)=>{
    const {us,pass} = req.body
    const id = req.params.id
    const record = await Reg.findOne({user:us})
    if(record.user!==null){
        if(record.password==pass){
            if(record.status=='active'){
                req.session.isAuth=true
                sess=req.session
                sess.user=record.user
                sess.role=record.role
                res.redirect('/')
            }else{
                res.send('your account is suspended')
            }
        }else{
            res.redirect('/login')
        }
    }else{
        res.redirect('/login')
    }
})

router.get('/logoutindex',(req,res)=>{
    req.session.destroy()
    sess=null
    res.redirect('/login')
})

router.get('/profile',async(req,res)=>{
    const record = await Reg.findOne()
    if(sess!==null){
        res.render('frontend/profile.ejs',{use:sess.user,record})
    }else{
        res.render('frontend/profile.ejs',{use:'notforyou',record})
    }
})

router.post('/profilerecord/:id',upload.single('img'),creg.frontendudate)




module.exports=router