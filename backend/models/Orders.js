const mongoose=require("mongoose");
const {Schema}=mongoose;
const OrderSchema=new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        order_lst: {
            type: Array,
            required: true
        }
    }
)
module.exports=mongoose.model("order",OrderSchema);