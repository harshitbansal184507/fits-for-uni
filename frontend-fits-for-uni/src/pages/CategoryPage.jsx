import React, { useEffect, useState } from 'react';
import UploadCategoryModel from '../components/UploadCategoryModel';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import EditCategory from '../components/EditCategory';
import CofirmBox from '../components/CofirmBox';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useSelector } from 'react-redux';

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        image: "",
    });
    const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({
        _id: "",
    });

    const fetchCategory = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getCategory,
            });
            const { data: responseData } = response;

            if (responseData.success) {
                setCategoryData(responseData.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory,
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                fetchCategory();
                setOpenConfirmBoxDelete(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='dark:bg-gray-700 dark:text-white min-h-screen p-4'>
            {/* Header */}
            <div className='p-4 bg-white shadow-md flex items-center justify-between dark:bg-gray-800 dark:text-white mb-4 rounded-lg'>
                <h2 className='font-semibold text-lg'>Department</h2>
                <button
                    onClick={() => setOpenUploadCategory(true)}
                    className='text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200'
                >
                    Add Department
                </button>
            </div>

            {/* No Data Message */}
            {!categoryData[0] && !loading && <NoData />}

            {/* Category Cards Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                {categoryData.map((category) => (
                    <div
                        key={category._id}
                        className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200'
                    >
                        {/* Category Image */}
                        <div className='w-full h-40 overflow-hidden'>
                            <img
                                alt={category.name}
                                src={category.image}
                                className='w-full h-full object-cover'
                            />
                        </div>

                        {/* Category Name */}
                        <div className='p-3'>
                            <h3 className='text-lg font-semibold text-gray-800 dark:text-white text-center'>
                                {category.name}
                            </h3>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex justify-between p-3'>
                            <button
                                onClick={() => {
                                    setOpenEdit(true);
                                    setEditData(category);
                                }}
                                className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded-lg mr-2 transition-all duration-200'
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setOpenConfirmBoxDelete(true);
                                    setDeleteCategory(category);
                                }}
                                className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded-lg transition-all duration-200'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Loading Spinner */}
            {loading && <Loading />}

            {/* Modals */}
            {openUploadCategory && (
                <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
            )}

            {openEdit && (
                <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />
            )}

            {openConfimBoxDelete && (
                <CofirmBox
                    close={() => setOpenConfirmBoxDelete(false)}
                    cancel={() => setOpenConfirmBoxDelete(false)}
                    confirm={handleDeleteCategory}
                />
            )}
        </section>
    );
};

export default CategoryPage;