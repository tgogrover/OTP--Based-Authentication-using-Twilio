const express=require('express');
const router=express.Router();
//require('dotenv').config() in every file otherwise you got error
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid,authToken);

// accountSid and authToken  available on https://www.twilio.com/console copy from there 
// save them as env variables



router.post('/send-OTP',(req,res)=>{
    //users enter their Mobile Number  to get OTP on their respective Mobile Number
    //I get those Mobile Number through Mobile Number
    const {mobileNo}=req.body
//This will make REST API call
//SERVICE_ID available on https://www.twilio.com/console/verify/services
//with SERVICE_ID, we can end OTP to everyone
client.verify.services(`${process.env.SERVICE_ID}`)
.verifications
//to send OTP to any Mobile Number we add those number here and +91 for India's Mobile Number only
.create({to: '+91'+ mobileNo, channel: 'sms'})
.then((verification) => {
    return res.status(200).json({ verification });
  })
  .catch((error) => {
    return res.status(400).json({ error });
  });

})


router.post('/verify-OTP',(req,res)=>{
    //Here Verificaton of OTP takes place sent to client 
    const {mobileNo,OTP}=req.body;
    // OTP in req.body is OTP entered by Client to verify that he/she is valid user or not 
    client.verify
    .services(`${process.env.SERVICE_ID}`)
    //here actual verificaton takes place 
    .verificationChecks.create({ to: "+91" + mobileNo, code: OTP })
    .then((verification_check) => {
      return res.status(200).json({ verification_check });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });


})

module.exports=router;
