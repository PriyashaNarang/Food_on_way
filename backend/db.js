const mongoose=require("mongoose");
const mongouri="mongodb+srv://priyashanarang:priyasha%40106B@foodonway.zezzowl.mongodb.net/foodonwaymern?retryWrites=true&w=majority&appName=foodonway"
const connecttomongodb=async()=>{
    try{
        await mongoose.connect(mongouri);
        console.log("Connected");
        const fetcheddata=mongoose.connection.db.collection("food");
        const data=await fetcheddata.find({}).toArray();
        const food_category=mongoose.connection.db.collection("foodcategory");
        const data2=await food_category.find({}).toArray();
        // console.log(data);
        global.food_items=data;
        global.food_category=data2;
        // console.log(global.food_items);
        // console.log(global.food_category);
    }
    catch(err)
    {
        console.log(err);
    }
}
module.exports=connecttomongodb;