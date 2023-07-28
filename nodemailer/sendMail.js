const nodemailer = require('nodemailer')
const CONFIG=require('../utils/config')


const sendMail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: CONFIG.USER,
      pass: CONFIG.PASSWORD,
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
    
  });

  var mailOptions = {
    from: CONFIG.USER,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log("Error in sending mail", error);
    else console.log("Email sent:" + info.response);
  });
};

module.exports= sendMail;