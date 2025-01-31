import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const AddToCartButton = ({ data, selectedSize }) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemsDetails] = useState();

  // Log the selectedSize for debugging
  console.log('Selected Size in AddToCartButton:', selectedSize);

  const handleADDTocart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      // Log the payload for debugging
      console.log('API Request Payload:', {
        productId: data?._id,
        size: selectedSize || 'freesize', // Ensure size is always defined
      });

      const response = await Axios({
        ...SummaryApi.addTocart,
        data: {
          productId: data?._id,
          size: selectedSize || 'freesize', // Include the selected size or default to 'freesize'
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if the product is already in the cart
    const checkingitem = cartItem.some(
      (item) => item.productId._id === data._id && item.size === (selectedSize || 'freesize') // Match both product ID and size
    );
    setIsAvailableCart(checkingitem);

    // Find the cart item details
    const product = cartItem.find(
      (item) => item.productId._id === data._id && item.size === (selectedSize || 'freesize') // Match both product ID and size
    );
    setQty(product?.quantity);
    setCartItemsDetails(product);
  }, [data, cartItem, selectedSize]);

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await updateCartItem(cartItemDetails?._id, qty + 1);
    if (response.success) {
      toast.success('Item added');
    }
  };

  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty === 1) {
      deleteCartItem(cartItemDetails?._id);
    } else {
      const response = await updateCartItem(cartItemDetails?._id, qty - 1);
      if (response.success) {
        toast.success('Item removed');
      }
    }
  };

  return (
    <div className=' w-full max-w-[150px]'>
      {isAvailableCart ? (
        <div className='flex w-full h-full border border-red-200 rounded'>
          <button
            onClick={decreaseQty}
            className='bg-red-500 hover:bg-red-600 text-white flex-1 w-full p-1 rounded-l flex items-center justify-center'
          >
            <FaMinus />
          </button>
          <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center bg-red-50 text-gray-800'>
            {qty}
          </p>
          <button
            onClick={increaseQty}
            className='bg-red-500 hover:bg-red-600 text-white flex-1 w-full p-1 rounded-r flex items-center justify-center'
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleADDTocart}
          className='w-full bg-red-500 hover:bg-red-600 text-white px-2 lg:px-4 py-1 rounded transition-colors'
        >
          {loading ? <Loading /> : 'Add'}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;