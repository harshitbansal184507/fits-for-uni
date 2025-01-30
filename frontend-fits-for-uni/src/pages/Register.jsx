import React, { useState } from 'react';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

    const valideValue = Object.values(data).every((el) => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            toast.error("Password and confirm password must be the same");
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: data,
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                navigate("/login");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-900'>
            <div className='bg-white/80 backdrop-blur-sm w-full max-w-lg mx-4 rounded-2xl shadow-xl p-8 dark:bg-gray-800/80'>
                <p className="text-center text-gray-800 dark:text-white">Welcome to Fits-For-PCTE</p>

                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className='grid gap-1'>
                        <label htmlFor='name' className='text-sm font-medium text-gray-700 dark:text-white'>
                            Name :
                        </label>
                        <input
                            type='text'
                            id='name'
                            autoFocus
                            className='w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 
                                     focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 outline-none
                                     dark:bg-gray-700/50 dark:border-gray-600 dark:text-white'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>

                    {/* Email Field */}
                    <div className='grid gap-1'>
                        <label htmlFor='email' className='text-sm font-medium text-gray-700 dark:text-white'>
                            Email :
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 
                                     focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 outline-none
                                     dark:bg-gray-700/50 dark:border-gray-600 dark:text-white'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>

                    {/* Password Field */}
                    <div className='grid gap-1'>
                        <label htmlFor='password' className='text-sm font-medium text-gray-700 dark:text-white'>
                            Password :
                        </label>
                        <div className='relative group'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 
                                         focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 outline-none
                                         dark:bg-gray-700/50 dark:border-gray-600 dark:text-white'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 
                                         hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200'
                            >
                                {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className='grid gap-1'>
                        <label htmlFor='confirmPassword' className='text-sm font-medium text-gray-700 dark:text-white'>
                            Confirm Password :
                        </label>
                        <div className='relative group'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                className='w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 
                                         focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 outline-none
                                         dark:bg-gray-700/50 dark:border-gray-600 dark:text-white'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your confirm password'
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 
                                         hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200'
                            >
                                {showConfirmPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Register Button */}
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
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <p className='mt-8 text-center text-gray-600 dark:text-gray-300'>
                    Already Registered?{' '}
                    <Link
                        to="/login"
                        className='font-semibold text-red-600 hover:text-red-700 transition-colors dark:text-red-400 dark:hover:text-red-300'
                    >
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;