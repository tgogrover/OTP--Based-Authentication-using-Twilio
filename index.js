const express=require('express');
const app=express();
const path=require('path')
const api_AuthenticateOTP=require('./api/authenticateOTP')
require('dotenv').config()
const axios =require('axios');

app.set('views',path.join(__dirname,'/ejsFiles'))
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index')
})

app.use(express.static('public'))
app.use(express.json())
app.use(api_AuthenticateOTP);





app.listen(process.env.PORT,()=>{
    console.log(`server is running successfully on ${process.env.PORT} `)
})