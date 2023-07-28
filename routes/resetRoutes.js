const express=require('express')
const router=express.Router();
const resetPassword = require('../controllers/resetPassword');

//token generation and mail send
router.post('/forgot_password',resetPassword.sendToken);

//verfifying token and reset password
router.post('/reset_password/:token',resetPassword.verifyAndUpdatePassword);

module.exports=router;