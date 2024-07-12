import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { useParams } from 'react-router-dom';
import { MdOutlineCloudUpload } from 'react-icons/md';
import ConfirmationCard from './ConfirmationCard';
import Product from '@/interfaces/product';

// -------------------------------------------------------------------------------------------
const EditProducts = () => {
  const { id } = useParams();
  const DashboardProduct = useSelector((state: RootState) =>
    state.DeshboardProducts.DashboardProduct.find(
      (product) => product.id == Number(id)
    )
  );
  const navigate = useNavigate();
  const [Product, setDashboardProduct] = useState<Product | null>(null);
  const [isConfirmationModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (DashboardProduct) {
      setDashboardProduct(DashboardProduct);
    } else {
      alert('Product not found');
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === 'image') {
      const input = e.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const selectedFile = input.files[0];
        const imageURL = URL.createObjectURL(selectedFile);
        console.log('Selected file:', imageURL);
      }
    } else if (name == 'gallery') {
      const input = e.target as HTMLInputElement;
      if (input.files) {
        const selectedFiles = Array.from(input.files).slice(0, 3);
        const filesArray = selectedFiles.map((file) =>
          URL.createObjectURL(file)
        );
        console.log('Selected files:', filesArray);
      }
    } else if (Product) {
      if (name === 'category') {
        setDashboardProduct({
          ...Product,
          category: { ...Product.category, name: value },
        });
      } else if (name === 'tags') {
        const tagsArray = value.split(',').map((tag) => tag.trim());
        setDashboardProduct({ ...Product, tags: tagsArray });
      } else {
        setDashboardProduct({ ...Product, [name]: value });
      }
    }
  };

  const handleSubmit = () => {
    // Logic to update the product
    console.log('Updated product:', Product, id);
    setModalVisible(false);
    navigate(`/adminDashboard/products/`);
  };

  const handleUpdate = () => {
    setModalVisible(true);
    console.log('the confilmation is on');
  };

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
                  name="name"
                  placeholder="Iphone"
                  value={Product?.name || ''}
                  onChange={handleChange}
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
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
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
                  name="shortDesc"
                  value={Product?.shortDesc || ''}
                  onChange={handleChange}
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
                <textarea
                  name="longDesc"
                  value={Product?.longDesc || ''}
                  onChange={handleChange}
                  placeholder="Long Description"
                  className=" w-full h-full outline-none pt-[8px] bg-[#F5F6F6]"
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
                  name="quantity"
                  value={Product?.quantity || ''}
                  onChange={handleChange}
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
                  name="regularPrice"
                  value={Product?.regularPrice || ''}
                  onChange={handleChange}
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
                <select
                  name="type"
                  value={Product?.type || ''}
                  onChange={handleChange}
                  className=" w-full h-full outline-none  bg-[#F5F6F6]"
                >
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
                  <input
                    type="file"
                    name="gallery"
                    onChange={handleChange}
                    multiple
                    accept="image/*"
                    id="gallery_"
                    className=" hidden"
                  />
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
                <select
                  name="category"
                  value={Product?.category.name || ''}
                  onChange={handleChange}
                  className=" w-full h-full outline-none  bg-[#F5F6F6]"
                >
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
                Tags
              </label>
              <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <input
                  type="text"
                  name="tags"
                  value={Product?.tags || []}
                  onChange={handleChange}
                  placeholder="Tags"
                  className=" w-full h-full outline-none  bg-[#F5F6F6]"
                />
              </div>
            </div>
            <div className="w-full mx-[7%] mb-[2.5%]">
              <label htmlFor="Product Title" className="">
                Is Available
              </label>
              <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
                <select
                  name="isAvailable"
                  value={String(Product?.isAvailable || false)}
                  onChange={handleChange}
                  className=" w-full h-full outline-none  bg-[#F5F6F6]"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between self-center">
          <button
            onClick={handleUpdate}
            className=" bg-primary border-[2px] h-full w-full border-primary text-white px-[60px] py-[7px] rounded-md flex justify-center items-center gap-2 text-lg
                hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out hover:bg-white hover:text-primary"
          >
            Edit Product
          </button>
        </div>
      </div>
      <div className="">
        <ConfirmationCard
          isVisible={isConfirmationModalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleSubmit}
          message="Are you sure you want to Update this item ?"
        />
      </div>
    </div>
  );
};

export default EditProducts;
