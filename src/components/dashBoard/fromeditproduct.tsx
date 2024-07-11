import React, { useState, ChangeEvent } from 'react';

import HSInput from '@/components/form/HSInput';
// import Check from '@/assets/Check.png';

// --------------------------------------------------------------------------------------------------------------
const MediaSection: React.FC = () => {
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

  return (
    <div className="border border-slate-700 p-3 mt-5">
      <div className="flex flex-row w-full  items-center gap-3 pb-4">
        <p className="text-[#323743] text-[18px] font-bold">Media</p>
        {/* <img src={Check} alt="CheckImage" /> */}
      </div>
      <p className="text-[#323743] text-[14px] font-bold mb-3">Feature Image</p>
      {featureImage ? (
        <div>
          <div className="w-[332px] h-[187px] mb-5 p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-md flex items-center justify-center">
            <img
              src={featureImage}
              alt="Feature"
              className="object-contain bg-white w-full h-full"
            />
          </div>
          <div className="flex flex-row relative top-[-55px]  w-[332px] items-center justify-end pr-2 rounded-br-lg rounded-bl-lg pb-1 pt-1 shadow-sm bg-black bg-opacity-50">
            <button
              type="button"
              onClick={() => setFeatureImage(null)}
              className="text-[11px] text-white font-bold z-20 opacity-100"
            >
              Remove
            </button>
            <label htmlFor="featureImageInput">
              <input
                id="featureImageInput"
                type="file"
                onChange={handleFeatureImageChange}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() =>
                  document.getElementById('featureImageInput')?.click()
                }
                className="border border-slate-50 text-[11px] ml-5 p-1 z-20 rounded-md font-bold outline-none text-white"
              >
                Change Image
              </button>
            </label>
          </div>
        </div>
      ) : (
        <div className="flex border border-dashed border-slate-400 text-center w-[125px] h-[125px] cursor-pointer justify-center items-center">
          <label
            htmlFor="featureImageInput"
            className="text-center w-full cursor-pointer"
          >
            <input
              id="featureImageInput"
              type="file"
              onChange={handleFeatureImageChange}
              style={{ display: 'none' }}
            />
            <span className="text-[30px] text-[#9095A1]">+</span>
          </label>
        </div>
      )}

      <p className="text-white font-bold mt-4">
        <span className="text-[#323743] text-[14px]">Gallery</span>{' '}
        <span className="text-[#323743] text-[12px]">
          ({galleryImages.length}/4 images)
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {galleryImages.map((image, index) => (
          <div
            key={`galleryImage-${index}`}
            className="relative w-[125px] h-[125px] flex justify-center items-center"
          >
            <img
              src={image}
              alt={`Gallery ${index}`}
              className="object-contain bg-white w-full h-full"
            />
            <button
              type="button"
              onClick={() => removeGalleryImage(index)}
              className="absolute top-[-10px] right-0 text-[#565D6D] rounded-full p-1"
            >
              x
            </button>
          </div>
        ))}
        {galleryImages.length < 4 && (
          <div className="flex border border-dashed border-slate-400 text-center w-[125px] h-[125px] cursor-pointer justify-center items-center">
            <label htmlFor="galleryImageInput">
              <input
                id="galleryImageInput"
                type="file"
                multiple
                onChange={handleGalleryImageChange}
                style={{ display: 'none' }}
              />
              <span className="text-[30px] text-[#9095A1]">+</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------------------------------------
const EditProducts: React.FC = () => {
  const [productTitle, setProductTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [salesPrice, setSalesPrice] = useState('');
  const [quantity, setQuantity] = useState('');
 

  
  return (
    <div>
      <p className="text-[#6B7280] text-[22px]">Create new product</p>

      <div className="w-full border border-slate-500 p-2 bg-[#171A1F] flex flex-row justify-between">
        <div className="border border-slate-700 p-2 flex flex-1 flex-row">
          <div className="border border-slate-700 p-2 flex-1 flex-col">
            {/* section one */}
            <div className="border border-slate-700 p-3">
              <div className="flex flex-row w-full  items-center gap-3 pb-3">
                <p className="text-[#323743] text-[18px] font-bold">
                  General Information
                </p>
                {/* <img src={Check} alt="CheckImage" /> */}
              </div>

              <div className="flex flex-col p-1 mb-3">
                <label
                  htmlFor="Product Title"
                  className="text-[#424856] text-[14px] font-bold"
                >
                  Product Title
                </label>
                <HSInput
                  id="ProductTitle"
                  placeholder="Casual Button-Down Shirt"
                  type="input"
                  text="text"
                  values={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col w-1/2 p-1 mb-3">
                  <label
                    htmlFor="ProductCategory1"
                    className="text-[#424856] text-[14px] font-bold mb-2"
                  >
                    Type
                  </label>
                  <select
                    id="ProductCategory1"
                    title="category"
                    className="text-black text-xs md:text-sm duration-150 w-full outline-none rounded-md border-[1px]  group-hover:border-grayDark px-5 py-3"
                  >
                    <option value="variable">Variable</option>
                    <option value="simple">Simple</option>
                    <option value="grouped">Grouped</option>
                    <option value="downloadable">Downloadable</option>
                    <option value="virtual">Virtual</option>
                    <option value="external">External</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/2 p-1 mb-3">
                  <label
                    htmlFor="ProductCategory2"
                    className="text-[#424856] text-[14px] font-bold mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="ProductCategory2"
                    title="category"
                    className="text-black text-xs md:text-sm duration-150 w-full outline-none rounded-md border-[1px]  group-hover:border-grayDark px-5 py-3"
                  >
                    <option value="shirt">Shirt</option>
                    <option value="pants">Pants</option>
                    <option value="shoes">Shoes</option>
                    <option value="accessories">Accessories</option>
                    <option value="electronics">Electronics</option>
                    <option value="home_appliances">Home Appliances</option>
                    <option value="books">Books</option>
                    <option value="beauty">Beauty</option>
                    <option value="fruits_vegetables">
                      Fruits & Vegetables
                    </option>
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
              <div className="flex flex-col">
                <label
                  htmlFor="Short Description"
                  className="text-[#424856] text-[14px] font-bold"
                >
                  Short Description
                </label>
                <HSInput
                  id="ShortDescription"
                  placeholder=""
                  type="textarea"
                  values={shortDescription}
                  onChangeTextArea={(e) => setShortDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-3">
                <label
                  htmlFor="Long Description"
                  className="text-[#424856] text-[14px] font-bold"
                >
                  Long Description
                </label>
                <HSInput
                  id="LongDescription"
                  placeholder=""
                  type="textarea"
                  values={longDescription}
                  onChangeTextArea={(e) => setLongDescription(e.target.value)}
                />
              </div>
            </div>
            {/* section two */}
            <MediaSection />
            {/* other section */}
            <div className="border border-slate-700 p-1 mt-5">
              <div className="flex flex-row w-full  items-center gap-3 pb-4">
                <p className="text-[#323743] text-[18px] font-bold">
                  {' '}
                  Sales Information
                </p>
                {/* <img src={Check} alt="CheckImage" /> */}
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col w-1/2 p-1 mb-3">
                  <label
                    htmlFor="Quantity"
                    className="text-[#424856] text-[14px] font-bold"
                  >
                    Regular Price
                  </label>
                  <HSInput
                    id="RegularPrice"
                    placeholder="$ 130.00"
                    type="input"
                    text="text"
                    values={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-1/2 p-1 mb-3">
                  <label
                    htmlFor="Sales Price"
                    className="text-[#424856] text-[14px] font-bold"
                  >
                    Sales Price
                  </label>
                  <HSInput
                    id="SalesPrice"
                    placeholder="$ 110.00"
                    type="input"
                    text="text"
                    values={salesPrice}
                    onChange={(e) => setSalesPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col w-1/2 p-1 mb-3">
                  <label
                    htmlFor="Quantity"
                    className="text-[#424856] text-[14px] font-bold"
                  >
                    Quantity
                  </label>
                  <HSInput
                    id="Quantity"
                    placeholder="150"
                    type="input"
                    text="text"
                    values={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-1/2 p-1 mb-3">
                  <label
                    htmlFor="unitMeasure"
                    className="text-[#424856] text-[14px] font-bold mb-2"
                  >
                    Unit / Measure
                  </label>
                  <select
                    id="unitMeasure"
                    title="item"
                    className="text-black text-xs md:text-sm duration-150 w-full outline-none rounded-md border-[1px]  group-hover:border-grayDark px-3 py-3"
                  >
                    <option value="item">Item</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="lb">Pound (lb)</option>
                    <option value="oz">Ounce (oz)</option>
                    <option value="l">Liter (L)</option>
                    <option value="ml">Milliliter (ml)</option>
                    <option value="pack">Pack</option>
                    <option value="box">Box</option>
                    <option value="dozen">Dozen</option>
                    <option value="piece">Piece</option>
                    <option value="set">Set</option>
                    <option value="pair">Pair</option>
                    <option value="bottle">Bottle</option>
                    <option value="can">Can</option>
                    <option value="bag">Bag</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default EditProducts;
