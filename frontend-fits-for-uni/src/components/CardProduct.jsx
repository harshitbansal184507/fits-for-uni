import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({data}) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`

    return (
        <Link 
            to={url} 
            className=' dark:text-white group relative border-2 border-gray-100 hover:border-red-100 transition-all duration-300 p-4 grid gap-3 min-w-36 lg:min-w-52 rounded-xl shadow-sm hover:shadow-lg bg-white overflow-hidden dark:bg-gray-900'
        >
            
            {/* Product Image */}
            <div className='relative min-h-24 w-full max-h-32 rounded-lg overflow-hidden transition-transform group-hover:scale-105'>
                <img
                    src={data.image[0]}
                    className='w-full h-full object-scale-down group-hover:opacity-90 transition-opacity'
                />
            </div>

            {/* Product Details */}
            <div className='space-y-2'>
            <div className='space-y-2'>
    <div className='relative'>
        <h3 className='font-bold text-sm lg:text-base line-clamp-2 text-gray-900 dark:bg-gray-700 dark:text-white
            before:absolute before:-left-2 before:inset-y-0 before:w-[3px] before:bg-red-500 
            before:opacity-0 group-hover:before:opacity-100 
            pl-3 transition-all duration-300 
            group-hover:text-red-600'>
            {data.name.toUpperCase()}
        </h3>
        <div className='absolute bottom-0 left-0 h-[2px] w-1/2 bg-red-500 
            opacity-0 group-hover:opacity-100 transition-all duration-300'></div>
    </div>
</div>
                
                

                {/* Price and Cart Section */}
                <div className='flex items-center justify-between mt-2'>
                    <div className='flex items-center gap-2'>
                        
                        
                            
                        
                    </div>

                    <div>
                        {data.stock == 0 ? (
                            <p className='text-red-500 text-sm'>Out of stock</p>
                        ) : (
                            <AddToCartButton data={data} />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardProduct