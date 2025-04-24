const express=require("express");
const router=express.Router();
const User=require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const jwtsecret="qwertyuioplkjhgfdsazxcvbnm!$%qwe"
router.post("/createuser",[
    body("email","Incorrect Email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password","Incorrect Password").isLength({ min: 5 })],
    async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt=await bcrypt.genSalt(10);
        let secpwrd=await bcrypt.hash(req.body.password,salt);
        try{
        await User.create({
            name: req.body.name,
            password: secpwrd,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success:true});
    }
    catch(err)
    {
        console.log(err);
        res.json({success:false});
    }
})
router.post("/loginuser",[
    body("email","Incorrect Email").isEmail(),
    body("password","Incorrect Password").isLength({ min: 5 })],async(req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            return res.status(400).json({ errors: errors.array() });
        }
    let email=req.body.email
    try{
        let userdata=await User.findOne({email});
        if(!userdata)
        {
            return res.status(400).json({ errors: "Try logging in with valid email" });
        }
        const pwdcompare=await bcrypt.compare(req.body.password,userdata.password);
        if(!pwdcompare)
        {
            return res.status(400).json({ errors: "Try logging in with valid password" });
        }
        const data={
            user:{
                id: userdata.id
            }
        }
        const authtoken=jwt.sign(data,jwtsecret);
        return res.json({success:true,authtoken});
    }
    catch(err)
    {
        console.log(err);
        res.json({success:false});
    }
})
module.exports=router;