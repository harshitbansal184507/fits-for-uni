import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('accesstoken',response.data.data.accesstoken)
                localStorage.setItem('refreshToken',response.data.data.refreshToken)

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))

                setData({
                    email : "",
                    password : "",
                })
                navigate("/")
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        
        <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-900'>            <div className='bg-white/80 backdrop-blur-sm w-full max-w-md mx-4 rounded-2xl shadow-xl p-8 dark:bg-gray-700'>
                {/* Header */}
                <div className='text-center mb-8 dark:gray-700 dark:text-white'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2 dark:text-white' >Welcome Back</h1>
                    <p className='text-gray-600 dark:text-white' >Please sign in to continue</p>
                </div>

                <form className='space-y-6 ' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <label htmlFor='email' className='text-sm font-medium text-gray-700 dark:text-white'>
                            Email Address
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 
                                     focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 outline-none'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='password' className='text-sm font-medium text-gray-700 dark:text-white'>
                            Password
                        </label>
                        <div className='relative group'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 
                                         focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 outline-none'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 
                                         hover:text-gray-700 transition-colors'
                            >
                                {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                            </button>
                        </div>
                        <Link 
                            to="/forgot-password"
                            className=' dark:text-white block text-right text-sm text-red-600 hover:text-red-700 transition-colors'
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        disabled={!valideValue}
                        className={`
                            w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200
                            ${valideValue 
                                ? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-600/30" 
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }
                        `}
                    >
                        Sign In
                    </button>
                </form>

                <p className='mt-8 text-center text-gray-600 dark:text-white'>
                    Don't have an account?{' '}
                    <Link 
                        to="/register"
                        className='font-semibold text-red-600 hover:text-red-700 transition-colors dark:text-white'
                    >
                        Register
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default Login