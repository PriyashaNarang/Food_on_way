const express=require("express");
const app=express();
const mongodb=require("./db");
mongodb();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
const port=5000;
app.get('/',(req,res)=>{
    res.send("Hello world!")
})
app.use(express.json());
app.use('/api',require('./routes/Createuser'));
app.use('/api',require('./routes/Displaydata'));
app.use('/api',require('./routes/Orderdata'));
app.listen(port,()=>{
    console.log(`Running on port ${port}`)
})