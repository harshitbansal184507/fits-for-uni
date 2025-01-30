import React from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import {Link, useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'


const Home = () => {
   const loadingCategory = useSelector(state => state.product.loadingCategory)
   const categoryData = useSelector(state => state.product.allCategory)
   const subCategoryData = useSelector(state => state.product.allSubCategory)
   const navigate = useNavigate()

   const handleRedirectProductListpage = (id,cat)=>{
       console.log(id,cat)
       const subcategory = subCategoryData.find(sub =>{
         const filterData = sub.category.some(c => {
           return c._id == id
         })
          return filterData ? true : null
       })
       const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
        navigate(url)
       console.log(url)
   }

   return (
    <section className='bg-gray-50 dark:bg-gray-800'>
       <div className='container mx-auto'>

           <div className={`dark:bg-gray-700 w-full h-full min-h-48 bg-red-50 rounded-lg shadow-md overflow-hidden ${!banner && "animate-pulse my-2" } `}>
           
               <img
                 src={banner}
                 className='w-full h-full hidden lg:block object-cover'
                 alt='banner'
                />
               <img
                 src={bannerMobile}
                 className='w-full h-full lg:hidden object-cover'
                 alt='banner'
                />
           </div>
       </div>
       <div className='text-center text-3xl  text-gray-700 font-semibold mt-3 dark:text-white bg-black-700'>
                Departments
              </div>

       <div className='container mx-auto px-4 my-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2'>
  {
    loadingCategory ? (
      new Array(12).fill(null).map((c, index) => {
        return (
          <div key={index + "loadingcategory"} className='bg-white rounded-lg p-4 min-h-36 grid gap-2 shadow-md animate-pulse'>
            <div className='bg-red-100 min-h-24 rounded-md'></div>
            <div className='bg-red-100 h-8 rounded-md'></div>
          </div>
        );
      })
    ) : (
      categoryData.map((cat, index) => {
        return (
          <div 
            key={cat._id + "displayCategory"} 
            className='w-full h-full cursor-pointer hover:bg-red-50 transition-all rounded-lg p-2 dark:bg-black-900'
            onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
          >
            <div className='bg-gray-100 border border-gray-200 rounded-lg p-4 hover:shadow-md flex flex-col dark:bg-red-900'>
              <div className='w-full h-48 overflow-hidden rounded-lg'>
                <img
                  src={cat.image}
                  className='w-full h-full object-cover rounded-md'
                  alt={cat.name}
                />
              </div>
              <p className='text-center text-gray-700 font-semibold mt-3 dark:text-white'>
                {cat.name}
              </p>
            </div>
          </div>
        );
      })
    )
  }
</div>





       {/**display category product */}
       {
         categoryData?.map((c,index)=>{
           return(
             <CategoryWiseProductDisplay
                key={c?._id+"CategorywiseProduct"}
                id={c?._id}
                name={c?.name}
             />
           )
         })
       }
    </section>
   )
}

export default Home