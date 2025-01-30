import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.webp'
import toast from 'react-hot-toast'

const DisplayCartItem = ({close}) => {
    const { notDiscountTotalPrice, totalPrice ,totalQty} = useGlobalContext()
    const cartItem  = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage = ()=>{
        if(user?._id){
            navigate("/checkout")
            if(close){
                close()
            }
            return
        }
        toast("Please Login")
    }
  return (
    <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
        <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto dark:bg-gray-700 dark:text-white'>
            <div className='flex items-center p-4 shadow-md gap-3 justify-between dark:bg-gray-700 dark:text-white'>
                <h2 className='font-semibold'>Cart</h2>
                <Link to={"/"} className='lg:hidden'>
                    <IoClose size={25}/>
                </Link>
                <button onClick={close} className='hidden lg:block'>
                    <IoClose size={25}/>
                </button>
            </div>

            <div className='dark:bg-gray-700 dark:text-white min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
                {/***display items */}
                {
                    cartItem[0] ? (
                        <>
                            <div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full dark:bg-gray-900 dark:text-white'>
                                    
                            </div>
                            <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto dark:bg-gray-700 dark:text-white'>
                                    {
                                        cartItem[0] && (
                                            cartItem.map((item,index)=>{
                                                return(
                                                    <div key={item?._id+"cartItemDisplay"} className='flex  w-full gap-4'>
                                                        <div className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded'>
                                                            <img
                                                                src={item?.productId?.image[0]}
                                                                className='object-scale-down'
                                                            />
                                                        </div>
                                                        <div className='w-full max-w-sm text-xs'>
                                                            <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                            <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                                        </div>
                                                        <div>
                                                            <AddToCartButton data={item?.productId}/>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                            </div>
                            <div className='bg-white p-4 dark:bg-gray-700 dark:text-white' >
                                <h3 className='font-semibold'>Bill details</h3>
                                
                                <div className='flex gap-4 justify-between ml-1'>
                                    <p>Quantity total</p>
                                    <p className='flex items-center gap-2'>{totalQty} item</p>
                                </div>
                                
                                
                            </div>
                        </>
                    ) : (
                        <div className='bg-gray-50 flex flex-col justify-center items-center p-6 rounded-lg shadow-md animate-fade-in dark:bg-gray-900 dark:text-white'>
    <img
        src={imageEmpty}
        className='w-full max-w-xs h-auto object-scale-down mb-4 animate-bounce-soft dark:bg-gray-700 dark:text-white'
    />
    <Link 
        onClick={close} 
        to={"/"} 
        className='block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors transform hover:scale-105 active:scale-95 duration-200'
    >
        Add Items
    </Link>
</div>
                    )
                }
                
            </div>

            {
                cartItem[0] && (
                    <div className='p-2'>
<div className='bg-red-600 text-white px-4 py-4 rounded-lg shadow-md flex items-center justify-between 
    hover:bg-red-700 transition-colors duration-300 
    relative overflow-hidden'>                           
                            <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
                                Proceed
                                <span><FaCaretRight/></span>
                            </button>
                        </div>
                    </div>
                )
            }
            
        </div>
    </section>
  )
}

export default DisplayCartItem
