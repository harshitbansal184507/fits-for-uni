import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { valideURLConvert } from '../utils/valideURLConvert';
import AddToCartButton from './AddToCartButton';

const CardProduct = ({ data }) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`;

    // State to store the selected size
    const [selectedSize, setSelectedSize] = useState(data.sizes?.[0]?.size || 'freesize'); // Default to the first size or 'freesize'

    // Handle size change
    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    // Check if the product has sizes
    const hasSizes = data.sizes && data.sizes.length > 0;

    return (
        <div className='dark:text-white group relative border-2 border-gray-100 hover:border-red-100 transition-all duration-300 p-4 grid gap-3 min-w-36 lg:min-w-52 rounded-xl shadow-sm hover:shadow-lg bg-white overflow-hidden dark:bg-gray-900'>
            {/* Product Image and Name (Clickable) */}
            <Link to={url} className='block'>
                <div className='relative min-h-24 w-full max-h-32 rounded-lg overflow-hidden transition-transform group-hover:scale-105'>
                    <img
                        src={data.image[0]}
                        className='w-full h-full object-scale-down group-hover:opacity-90 transition-opacity'
                        alt={data.name}
                    />
                </div>

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
            </Link>

            {/* Size Selection (Not Clickable for Navigation) */}
            {hasSizes && (
                <div>
                    <label htmlFor="size-select" className="block text-sm text-gray-600 dark:text-gray-300">Select Size</label>
                    <select
                        id="size-select"
                        value={selectedSize}
                        onChange={handleSizeChange}
                        className='mt-1 p-2 border border-gray-300 rounded-lg w-full bg-white dark:bg-gray-700 dark:text-white'
                    >
                        {data.sizes.map((sizeOption, index) => (
                            <option key={index} value={sizeOption.size}>
                                {sizeOption.size} {sizeOption.stock > 0 ? `(${sizeOption.stock} in stock)` : '(Out of stock)'}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Add to Cart Button (Not Clickable for Navigation) */}
            <div className='bg-center'>
                {data.stock == 0 ? (
                    <p className='text-red-500 text-sm bg-center'>Out of stock</p>
                ) : (
                    <AddToCartButton data={data} selectedSize={selectedSize} />
                )}
            </div>
        </div>
    );
}

export default CardProduct;