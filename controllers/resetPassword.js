const User = require('../models/user');
const bcrypt=require('bcrypt');
const randomstring=require('randomstring');
const sendMail = require('../nodemailer/sendMail');
// const mongoose = require('mongoose');
// const O_id = new mongoose.Types.ObjectId();

const resetPassword ={
    sendToken : async(req,res)=>{
    try
    {
        const{email} = req.body;

    let userDB = await User.findOne({ email: email });
    if (!userDB)
      return res.status(400).send({ message: "Invalid User email provided" });
    //creating random string and bcrypt to hash the token
    let token = randomstring.generate({
      length: 32,
      charset: "alphanumeric",
    });

    //creating expiry after 1 hour
    let expiry = new Date(Date.now() + 3600 * 1000);

    //updating users collection with resetToken and resetExpiry Time
    const resetUpdateDB = await User.findOneAndUpdate(
      { email: email },
      {
          resetToken: token,
          resetExpiry: expiry,        
      },
      {new:true},
    );

//     let link = `http://localhost:5173/reset_password/${userDB._id}/${token}`;
//  let link = `http://localhost:5173/reset_password/${token}`;
 let link = `https://dynamic-banoffee-ec2200.netlify.app/reset_password/${token}`;       

    await sendMail(userDB.email, "Password Reset App - Reset your password", `<p>Hello! ${email}, You have requested to reset your password.</p>
    <p>Please click the following link to reset your password: ${link}`);
    res.status(200).send({
      message: `Reset link sent to mail ${userDB.email} and link is ${link}`,
    });

    }
    catch(error)
    {
        console.log("Send Token Failed in Email "+error)
    }
  },

  verifyAndUpdatePassword : async(req,res)=>{
    try{
      
      console.log("Entered")
      const{token,password} = req.body;
      console.log( token)
        console.log("Token --> "+{token});
      
       let userDB=await User.findOne({ resetToken: token });
      //  //checking user is in db or not
      //   
      //  if (!userDB)
      //   return res.status(400).send({ Error: "Invalid Link or Expired" });

        //checking token is present in db is the token sent by the user or not
        const isTokenValid = userDB.resetToken === token;

        //checking if the time limit to change the password has the expired
        const isntExpired = userDB.resetExpiry > Date.now();
        console.log("Settt.....  "+isTokenValid, isntExpired);

        if (isTokenValid && isntExpired) {
        console.log("YESSS")
          const hashedNewPassword = await bcrypt.hash(password, Number(10));
          
          //deleting the token and expiry time after updating password
          const updatePasswordDB = await User.findOneAndUpdate(
            { resetToken: token },
               { 
                password: hashedNewPassword,
                resetToken: undefined,
                resetExpiry: undefined,                
               },
            { new: true }
          );

          res.status(200).send({ success: "password updated successfully" });
        } else res.status(400).send({ Error: "Invalid Link or Expired !!!" });

          }
          catch(error)
          {
            console.log("Update password failed in backend", error);
          }
        }

}

module.exports=resetPassword;
