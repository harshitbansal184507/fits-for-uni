import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";

export const addToCartItemController = async (request, response) => {
    try {
      const userId = request.userId;
      const { productId, size } = request.body; // Add size to the destructured request body
  
      // Validate required fields
      if (!productId || !size) {
        return response.status(400).json({
          message: "Provide productId and size",
          error: true,
          success: false,
        });
      }
  
      // Check if the item is already in the cart with the same size
      const checkItemCart = await CartProductModel.findOne({
        userId: userId,
        productId: productId,
        size: size, // Check for the same size
      });
  
      if (checkItemCart) {
        return response.status(400).json({
          message: "Item already in cart with the same size",
          error: true,
          success: false,
        });
      }
  
      // Create a new cart item with size
      const cartItem = new CartProductModel({
        quantity: 1,
        userId: userId,
        productId: productId,
        size: size, // Include the size field
      });
  
      const save = await cartItem.save();
  
      // Update the user's shopping cart
      const updateCartUser = await UserModel.updateOne(
        { _id: userId },
        {
          $push: {
            shopping_cart: productId,
          },
        }
      );
  
      return response.json({
        data: save,
        message: "Item added successfully",
        error: false,
        success: true,
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
  };

export const getCartItemController = async(request,response)=>{
    try {
        const userId = request.userId

        const cartItem =  await CartProductModel.find({
            userId : userId
        }).populate('productId')

        return response.json({
            data : cartItem,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateCartItemQtyController = async (request, response) => {
    try {
      const userId = request.userId;
      const { _id, qty, size } = request.body; // Add size to the destructured request body
  
      // Validate required fields
      if (!_id || !qty) {
        return response.status(400).json({
          message: "Provide _id, qty, and size",
          error: true,
          success: false,
        });
      }
  
      // Update the cart item with the new quantity and size
      const updateCartitem = await CartProductModel.updateOne(
        {
          _id: _id,
          userId: userId,
        },
        {
          quantity: qty,
          size: size, // Update the size field
        }
      );
  
      return response.json({
        message: "Cart updated",
        success: true,
        error: false,
        data: updateCartitem,
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
  };

export const deleteCartItemQtyController = async(request,response)=>{
    try {
      const userId = request.userId // middleware
      const { _id } = request.body 
      
      if(!_id){
        return response.status(400).json({
            message : "Provide _id",
            error : true,
            success : false
        })
      }

      const deleteCartItem  = await CartProductModel.deleteOne({_id : _id, userId : userId })

      return response.json({
        message : "Item remove",
        error : false,
        success : true,
        data : deleteCartItem
      })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
