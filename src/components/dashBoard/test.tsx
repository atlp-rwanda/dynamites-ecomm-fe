import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditProductPage = ({ products }) => {
  const { id } = useParams();
  const [DashboardProduct, setDashboardProduct] = useState(null);

  useEffect(() => {
    const fetchedProduct = products.find(
      (product) => product.id === parseInt(id)
    );
    if (fetchedProduct) {
      setDashboardProduct(fetchedProduct);
    } else {
      alert('Product not found');
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDashboardProduct({ ...DashboardProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to update the product
    console.log('Updated product:', DashboardProduct);
  };

  if (!DashboardProduct) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full mx-[7%] mb-[2.5%]">
          <label htmlFor="Product Title" className="">
            Quantity
          </label>
          <div className="bg-[#F5F6F6] min-h-[51px] w-full flex flex-row mt-[10px] items-center pl-[10px] rounded-lg">
            <input
              type="text"
              name="quantity"
              placeholder="30"
              value={DashboardProduct.quantity || ''}
              onChange={handleChange}
              className="w-full h-full outline-none bg-[#F5F6F6]"
            />
          </div>
        </div>
        {/* Add more fields as needed */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProductPage;
