const express = require('express');
const User = require('../models/user.model');
const CommonHelpers = require('../helpers/common.helpers');
 const bcrypt = require('bcryptjs');


const router = express.Router();

router.post('/login',async(req,res)=>{
  try{
    const {email,password} = req.body;

    const user  = await User.findOne({email});
    if(!user) return res.status(500).send({message:'Please enter a valid email and password',status:500});
    
    // check password
    const isPasswordMatched = await bcrypt.compare(password,user.password);
    if(!isPasswordMatched) return res.status(500).send({message:'Please enter a valid email and password',status:500});
    const {email:emailid,name,mobile} = user || {}
    return  res.status(200).send({user:{email:emailid,name,mobile},status:200,token:CommonHelpers.getNewToken(user)});

  }
  catch(err){
    res.status(500).send({err});
  }
});

router.post('/signup',async(req,res)=>{
    try{
      const {email,password} = req.body || {};
      const user  = await User.findOne({email})
      // if already user is present then don't allow to singnup throw the error
      if(user) return  res.status(500).send({status:500,message:'Please enter valid email and mobile number'});;
  
      // if user is not present then allow to singup
     bcrypt.hash(password,10,async(err,result)=>{
      if(err) return res.status(500).send({message:'Something went wrong',status:500});

      const createUser = await User.create({...req.body,password:result});
      const {email,name,mobile} =createUser || {}  
      const token = CommonHelpers.getNewToken(createUser);

        res.status(200).send({user:{email,name,mobile},status:201,token});
     })
    }
    catch(err){
      console.log(err)
        res.status(500).send({err});
    }
});

module.exports = router;