import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import uploadImage from '../utils/UploadImage';
import Loading from './Loading';
import ViewImage from './ViewImage';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import AddFieldComponent from './AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';

const EditProductAdmin = ({ close, data: propsData, fetchProductData }) => {
  const [data, setData] = useState({
    _id: propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    sizes: propsData.sizes || [], // Updated to include sizes array
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState('');
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState('');
  const [selectSubCategory, setSelectSubCategory] = useState('');
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;
    setData((preve) => ({
      ...preve,
      image: [...preve.image, imageUrl],
    }));
    setImageLoading(false);
  };

  const handleDeleteImage = (index) => {
    data.image.splice(index, 1);
    setData((preve) => ({ ...preve }));
  };

  const handleRemoveCategory = (index) => {
    data.category.splice(index, 1);
    setData((preve) => ({ ...preve }));
  };

  const handleRemoveSubCategory = (index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => ({ ...preve }));
  };

  const handleAddField = () => {
    setData((preve) => ({
      ...preve,
      more_details: {
        ...preve.more_details,
        [fieldName]: '',
      },
    }));
    setFieldName('');
    setOpenAddField(false);
  };

  const handleAddSize = () => {
    setData((preve) => ({
      ...preve,
      sizes: [
        ...preve.sizes,
        {
          size: '',
          stock: 0,
          unit: '',
        },
      ],
    }));
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...data.sizes];
    updatedSizes[index][field] = value;
    setData((preve) => ({
      ...preve,
      sizes: updatedSizes,
    }));
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = data.sizes.filter((_, i) => i !== index);
    setData((preve) => ({
      ...preve,
      sizes: updatedSizes,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('data', data);

    try {
      const response = await Axios({
        ...SummaryApi.updateProductDetails,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        if (close) {
          close();
        }
        fetchProductData();
        setData({
          name: '',
          image: [],
          category: [],
          subCategory: [],
          sizes: [],
          price: '',
          discount: '',
          description: '',
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4">
      <div className="dark:bg-gray-700 dark:text-white bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]">
        <section className="">
          <div className="p-2 dark:bg-gray-700 dark:text-white bg-white shadow-md flex items-center justify-between">
            <h2 className="font-semibold">Edit Product</h2>
            <button onClick={close}>
              <IoClose size={20} />
            </button>
          </div>
          <div className="grid p-3">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="grid gap-1">
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="dark:bg-gray-700 dark:text-white bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>

              {/* Description Field */}
              <div className="grid gap-1">
                <label htmlFor="description" className="font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  type="text"
                  placeholder="Enter product description"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  required
                  multiple
                  rows={3}
                  className="dark:bg-gray-700 dark:text-white bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
                />
              </div>

              {/* Image Upload Field */}
              <div>
                <p className="font-medium">Image</p>
                <div>
                  <label
                    htmlFor="productImage"
                    className="dark:bg-gray-700 dark:text-white bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
                  >
                    <div className="text-center flex justify-center items-center flex-col">
                      {imageLoading ? (
                        <Loading />
                      ) : (
                        <>
                          <FaCloudUploadAlt size={35} />
                          <p>Upload Image</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      id="productImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleUploadImage}
                    />
                  </label>
                  {/* Display Uploaded Images */}
                  <div className="flex flex-wrap gap-4">
                    {data.image.map((img, index) => (
                      <div
                        key={img + index}
                        className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group dark:bg-gray-700 dark:text-white"
                      >
                        <img
                          src={img}
                          alt={img}
                          className="w-full h-full object-scale-down cursor-pointer"
                          onClick={() => setViewImageURL(img)}
                        />
                        <div
                          onClick={() => handleDeleteImage(index)}
                          className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer"
                        >
                          <MdDelete />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category Field */}
              <div className="grid gap-1">
                <label className="font-medium">Department</label>
                <div>
                  <select
                    className="bg-blue-50 border w-full p-2 rounded dark:bg-gray-700 dark:text-white"
                    value={selectCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const category = allCategory.find((el) => el._id === value);
                      setData((preve) => ({
                        ...preve,
                        category: [...preve.category, category],
                      }));
                      setSelectCategory('');
                    }}
                  >
                    <option value="">Select Department</option>
                    {allCategory.map((c, index) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-wrap gap-3">
                    {data.category.map((c, index) => (
                      <div
                        key={c._id + index + 'productsection'}
                        className="text-sm flex items-center gap-1 bg-blue-50 mt-2 dark:bg-gray-700 dark:text-white"
                      >
                        <p>{c.name}</p>
                        <div
                          className="hover:text-red-500 cursor-pointer"
                          onClick={() => handleRemoveCategory(index)}
                        >
                          <IoClose size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

             

              {/* Sizes Field */}
              <div className="grid gap-1">
                <label className="font-medium">Sizes</label>
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="bg-red-700 hover:bg-red-900 py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded"
                >
                  Add Size
                </button>
                {data.sizes.map((size, index) => (
                  <div key={index} className="grid gap-2 border p-2 rounded">
                    <div className="grid gap-1">
                      <label>Size</label>
                      <input
                        type="text"
                        placeholder="Enter size (e.g., S, M, L)"
                        value={size.size}
                        onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                        className="bg-blue-50 p-2 outline-none border focus-within:border-red-700 rounded dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="grid gap-1">
                      <label>Stock</label>
                      <input
                        type="number"
                        placeholder="Enter stock"
                        value={size.stock}
                        onChange={(e) => handleSizeChange(index, 'stock', e.target.value)}
                        className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="grid gap-1">
                      <label>Unit</label>
                      <input
                        type="text"
                        placeholder="Enter unit (e.g., pcs)"
                        value={size.unit}
                        onChange={(e) => handleSizeChange(index, 'unit', e.target.value)}
                        className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(index)}
                      className="bg-red-700 hover:bg-red-900 py-1 px-3 w-32 text-center font-semibold border border-red-200 hover:text-neutral-900 cursor-pointer rounded"
                    >
                      Remove Size
                    </button>
                  </div>
                ))}
              </div>

              {/* Price Field */}
              <div className="grid gap-1">
                <label htmlFor="price" className="font-medium">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Enter product price"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Discount Field */}
              <div className="grid gap-1">
                <label htmlFor="discount" className="font-medium">
                  Discount
                </label>
                <input
                  id="discount"
                  type="number"
                  placeholder="Enter product discount"
                  name="discount"
                  value={data.discount}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* More Details Field */}
              {Object.keys(data.more_details).map((k, index) => (
                <div className="grid gap-1" key={k + index}>
                  <label htmlFor={k} className="font-medium">
                    {k}
                  </label>
                  <input
                    id={k}
                    type="text"
                    value={data.more_details[k]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setData((preve) => ({
                        ...preve,
                        more_details: {
                          ...preve.more_details,
                          [k]: value,
                        },
                      }));
                    }}
                    required
                    className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded dark:bg-gray-700 dark:text-white"
                  />
                </div>
              ))}

              {/* Add More Fields Button */}
              <div
                onClick={() => setOpenAddField(true)}
                className="hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded dark:bg-gray-700 dark:text-white"
              >
                Add Fields
              </div>

              {/* Submit Button */}
              <button className="bg-red-700 hover:bg-red-900 py-2 rounded font-semibold">
                Update Product
              </button>
            </form>
          </div>

          {/* View Image Modal */}
          {ViewImageURL && <ViewImage url={ViewImageURL} close={() => setViewImageURL('')} />}

          {/* Add Field Modal */}
          {openAddField && (
            <AddFieldComponent
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              submit={handleAddField}
              close={() => setOpenAddField(false)}
            />
          )}
        </section>
      </div>
    </section>
  );
};

export default EditProductAdmin;



