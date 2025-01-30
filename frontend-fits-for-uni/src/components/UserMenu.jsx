import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin'

const UserMenu = ({close}) => {
   const user = useSelector((state)=> state.user)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = async()=>{
        try {
          const response = await Axios({
             ...SummaryApi.logout
          })
          console.log("logout",response)
          if(response.data.success){
            if(close){
              close()
            }
            dispatch(logout())
            localStorage.clear()
            toast.success(response.data.message)
            navigate("/")
          }
        } catch (error) {
          console.log(error)
          AxiosToastError(error)
        }
   }

   const handleClose = ()=>{
      if(close){
        close()
      }
   }
  return (
    <div className=" dark:bg-gray-700 dark:text-white">
        <div className='font-semibold'>My Account</div>
        <div className='text-sm flex items-center gap-2  dark:bg-gray-700 dark:text-white'>
          <span className='max-w-52 text-ellipsis line-clamp-1 dark:bg-gray-700 dark:text-white'>{user.name || user.mobile} <span className='text-medium text-red-600'>{user.role === "ADMIN" ? "(Teacher)" : "" }</span></span>
          <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-red-800'>
            <HiOutlineExternalLink size={15}/>
          </Link>
        </div>

        <Divider/>

        <div className='text-sm grid gap-1'>
            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 hover:bg-red-700 py-1'>Department</Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 hover:bg-red-700 py-1'>Sizes</Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2 hover:bg-red-700 py-1'>Upload Product</Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 hover:bg-red-700 py-1'>Product</Link>
              )
            }
            {isAdmin(user.role) && ( 
  <Link onClick={handleClose} to={"/dashboard/all-orders"} className='px-2 hover:bg-red-700 py-1'>
    View All Orders
  </Link>
)}

            <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2 hover:bg-red-700 py-1'>My Orders</Link>

            <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 hover:bg-red-700 py-1'>Save Address</Link>

            <button onClick={handleLogout} className='text-left px-2 hover:bg-red-700 py-1'>Log Out</button>

        </div>
    </div>
  )
}

export default UserMenu
