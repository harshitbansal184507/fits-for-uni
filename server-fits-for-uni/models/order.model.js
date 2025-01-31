import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
    orderId : {
        type : String,
        required : [true, "Provide orderId"],
        unique : true
    },
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },
   
    product_details : {
        name : String,
        image : Array,
    },
    
    delivery_address : {
        type : mongoose.Schema.ObjectId,
        ref : 'address'
    },
  
},{
    timestamps : true
})

const OrderModel = mongoose.model('order',orderSchema)

export default OrderModel