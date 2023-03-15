const Query=require('../modles/userquery')
const nodemailer = require('nodemailer')


exports.frontendsave=async(req,res)=>{
    const {email,query} =req.body
    const record = new Query({
        user:email,
        query:query,
        postdate:new Date()
    })
    await record.save()
    res.redirect('/')
}

exports.adminqueryshow=async(req,res)=>{
    const record = await Query.find().sort({postdate:-1})
    res.render('admin/query.ejs',{record})
}
exports.adminquerydelete=async(req,res)=>{
    const id =   req.params.id
    const record =  await Query.findByIdAndDelete(id)
    res.redirect('/admin/query')
}
exports.adminqueryreply=async(req,res)=>{
    const id = req.params.id
    const record = await Query.findById(id)
    res.render('admin/queryreply.ejs',{record})
}
exports.adminqueryrecord=async(req,res)=>{
    const id = req.params.id
    const {mail,sub,body} = req.body
    if(req.file){
        const imge = req.file.filename
        let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'risudid09@gmail.com', 
            pass: 'prikddezodrbbqvq',  // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'risudid09@gmail.com', // sender address
        to: mail, // list of receivers
        subject: sub, // Subject line
        text: body, // plain text body
        // html: "<b>Hello world?</b>", // html body
        attachments:({
            img:imge,
        })
    });
    }else{
        let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'risudid09@gmail.com', 
            pass: 'prikddezodrbbqvq',  // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'risudid09@gmail.com', // sender address
        to: mail, // list of receivers
        subject: sub, // Subject line
        text: body, // plain text body
        // html: "<b>Hello world?</b>", // html body
    });
    }
    res.redirect('/admin/query')
}