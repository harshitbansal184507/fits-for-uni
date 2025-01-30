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
    size :{
        type : [String] , 
        enum : ["XS","S","M","L","XL","XXL","XXXL","XXXXL","XXXXXL","FREE SIZE"], 
        default : "FREE SIZE", 
        required : [true, "Provide Size"],
        ref : "size", 
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