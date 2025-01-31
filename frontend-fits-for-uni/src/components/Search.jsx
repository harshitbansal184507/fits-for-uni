import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)

    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    }, [location])

    const redirectToSearchPage = () => {
        navigate("/search")
    }

    const handleOnChange = (e) => {
        const value = e.target.value
        const url = `/search?q=${value}`
        navigate(url)
    }

    return (
        <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border-2 border-transparent overflow-hidden flex items-center text-white bg-gray-900 group dark:bg-white dark:text-black'>
            <div>
                {
                    (isMobile && isSearchPage) ? (
                        <Link to={"/"} className='dark:bg-white dark:text-black flex justify-center items-center h-full p-2 m-1  bg-black rounded-full shadow-md'>
                            <FaArrowLeft size={20} />
                        </Link>
                    ) : (
                        <button className='dark:bg-white dark:text-black flex justify-center items-center h-full p-3 group-focus-within:text-white  rounded-full'>
                            <IoSearch size={22} />
                        </button>
                    )
                }
            </div>
            <div className='w-full h-full'>
                {
                    !isSearchPage ? (
                        // Not in search page
                        <div onClick={redirectToSearchPage} className='w-full h-full flex items-center dark:text-gray-700'>
                            <TypeAnimation
                                sequence={[
                                    'Search "T-Shirts"',
                                    1000,
                                    'Search "Shirts"',
                                    1000,
                                    'Search "Coats"',
                                    1000,
                                    'Search "Ties"',
                                    1000,
                                    'Search "Pants"',
                                    1000,
                                    'Search "Hoodies"',
                                    1000,
                                    'Search "Ties"',
                                    1000,
                                    'Search "Scarfs"',
                                    1000,
                                    'Search "Caps"',
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                    ) : (
                        // When on the search page
                        <div className='w-full h-full'>
                            <input
                                type='text'
                                placeholder='Search for more.'
                                autoFocus
                                defaultValue={searchText}
                                className='dark:bg-white dark:text-black bg-transparent w-full h-full outline-none text-white placeholder-gray-400 border-2 border-transparent  transition-all duration-300'
                                onChange={handleOnChange}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Search