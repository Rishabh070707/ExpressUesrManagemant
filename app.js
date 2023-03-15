const express = require('express')
const app = express()
const adminRouter = require('./router/admin')
const frontendRouter = require('./router/frontend')
app.use(express.urlencoded({extended:false}))
const session = require('express-session')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/jaipurexpress',()=>{
    console.log('connet node to db jaipurexpress')
})











app.use(session({
    secret:'ram',
    resave:false,
    saveUninitialized:false
}))
app.use(express.static('./public'))
app.set('view engine','ejs')
app.use('/admin',adminRouter)
app.use(frontendRouter)
app.listen(5000,()=>{
    console.log('server is runing on 5000')
})