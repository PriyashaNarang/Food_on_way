const express=require("express");
const router=express.Router();
const Orders=require("../models/Orders");
router.post("/orderdata",async(req,res)=>{
    let data=req.body.orderdata;
    await data.splice(0,0,{Orderdate:req.body.orderdate});
    let eid=await Orders.findOne({"email":req.body.email});
    console.log(eid);
    if(eid==null)
    {
        try{
            await Orders.create({
                email: req.body.email,
                order_lst: [data]
            }).then(()=>{
                res.json({success:true});
            })
        }
        catch(err){
            console.log(err);
            res.send(err);
        }
    }
    else
    {
        try 
        {
            Orders.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_lst: data } }, 
            ).then(() => {
                res.json({ success: true });
            })
        } 
        catch (err) 
        {
            res.send(err);
        }
    }
})
router.post("/myorderdata",async(req,res)=>{
    try
    {
        let mydata=await Orders.findOne({"email":req.body.email});
        res.json({orderData: mydata});
    }
    catch(err)
    {
        res.send(err);
    }
})
module.exports=router;