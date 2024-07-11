import React, { useState, ChangeEvent } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';
import HSInput from '@/components/form/HSInput';

// -------------------------------------------------------------------------------------------
const EditProducts = () => {
  const [productTitle, setProductTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [salesPrice, setSalesPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // ---------------------------------------------------------------

  const [featureImage, setFeatureImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const handleFeatureImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFeatureImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGalleryImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setGalleryImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  // ----------------------------------------------------------------------------

  return (
    <div className="pr-[3%]">
      <div className=" mb-4">
        <div className="font-bold text-lg ">Edit Product</div>
      </div>
      <div className="bg-white mr-[10%] w-full h-full flex flex-col pr-[5%] pt-[5%] pb-[10%] rounded-2xl">
        <div className=" grid gap-[5%] md:grid-cols-2 grid-rows-1 mb-[3%] sm:grid-cols-1 ">
          <div className="flex flex-col justify-start items-center text-[#3E3E3E] text-[14px] pl-[7%]">
            <div className=" w-full mx-[7%] mb-[2.5%] ">
              <label htmlFor="Product Title" className="">
                Product Name
              </label>
              <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <input
                  type="text"
                  placeholder="Iphone"
                  className=" w-full h-full outline-none  bg-[#F5F6F6]"
                />
              </div>
            </div>
            <div className="w-full mx-[7%] mb-[2.5%]">
              <label htmlFor="" className="">
                Image
              </label>
              <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <input
                  type="file"
                  className="w-full h-full outline-none  bg-[#F5F6F6]"
                />
              </div>
            </div>
            <div className="w-full mx-[7%] mb-[2.5%]">
              <label htmlFor="Product Title" className="">
                Short Description
              </label>
              <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <input
                  type="text"
                  placeholder="Short Description"
                  className=" w-full h-full outline-none  bg-[#F5F6F6]"
                />
              </div>
            </div>
            <div className="w-full mx-[7%] mb-[2.5%]">
              <label htmlFor="Product Title" className="">
                Long Description
              </label>
              <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <input
                  type="text"
                  placeholder="Long Description"
                  className=" w-full h-full outline-none  bg-[#F5F6F6]"
                />
              </div>
            </div>
            <div className="w-full mx-[7%] mb-[2.5%]">
              <label htmlFor="Product Title" className="">
                Quantity
              </label>
              <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <input
                  type="text"
                  placeholder="30"
                  className=" w-full h-full outline-none  bg-[#F5F6F6]"
                />
              </div>
            </div>
            <div className="w-full mx-[7%] mb-[2.5%]">
              <label htmlFor="Product Title" className="">
                Regular Price
              </label>
              <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <input
                  type="text"
                  placeholder="$2000"
                  className=" w-full h-full outline-none  bg-[#F5F6F6]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center text-[#3E3E3E] text-[14px] pl-[3%] sm:pl-[7%]">
            <div className="w-full mx-[7%] mb-[2.5%]">
              <label htmlFor="Product Title" className="">
                Type
              </label>
              <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <select className=" w-full h-full outline-none  bg-[#F5F6F6]">
                  <option value="simple">Simple</option>
                  <option value="grouped">Grouped</option>
                  <option value="variable">Variable</option>
                  <option value="downloadable">Downloadable</option>
                  <option value="virtual">Virtual</option>
                  <option value="external">External</option>
                </select>
              </div>
            </div>
            <div className="w-full mx-[7%] mb-[2.5%]">
              <label htmlFor="" className="">
                Gallery
              </label>
              <div className="bg-[#F5F6F6] min-h-[142px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <div className=" w-full h-full flex flex-col">
                  <input type="file" id="gallery_" className=" hidden" />
                  <label
                    htmlFor="gallery_"
                    className=" flex flex-col justify-center items-center"
                  >
                    <MdOutlineCloudUpload className=" w-[32px] h-[32px] text-primary" />
                    <div className=" text-lg">Click To upload</div>
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full mx-[7%] mb-[2.5%]">
              <label htmlFor="Product Title" className="">
                Category
              </label>
              <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <select className=" w-full h-full outline-none  bg-[#F5F6F6]">
                  <option value="shirt">Shirt</option>
                  <option value="pants">Pants</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                  <option value="electronics">Electronics</option>
                  <option value="home_appliances">Home Appliances</option>
                  <option value="books">Books</option>
                  <option value="beauty">Beauty</option>
                  <option value="fruits_vegetables">Fruits & Vegetables</option>
                  <option value="dairy_products">Dairy Products</option>
                  <option value="meat_poultry">Meat & Poultry</option>
                  <option value="seafood">Seafood</option>
                  <option value="bakery">Bakery</option>
                  <option value="beverages">Beverages</option>
                  <option value="snacks">Snacks</option>
                  <option value="frozen_foods">Frozen Foods</option>
                  <option value="organic">Organic</option>
                </select>
              </div>
            </div>
            <div className="w-full mx-[7%] mb-[2.5%]">
              <label htmlFor="Product Title" className="">
                Gallery
              </label>
              <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <input
                  type="text"
                  placeholder="$2000"
                  className=" w-full h-full outline-none  bg-[#F5F6F6]"
                />
              </div>
            </div>
            <div className="w-full mx-[7%] mb-[2.5%]">
              <label htmlFor="Product Title" className="">
                Is Available
              </label>
              <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <select className=" w-full h-full outline-none  bg-[#F5F6F6]">
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between self-center">
          <button
            className=" bg-primary border-[2px] h-full w-full border-primary text-white px-[60px] py-[7px] rounded-md flex justify-center items-center gap-2 text-lg
                hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out hover:bg-white hover:text-primary"
          >
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
