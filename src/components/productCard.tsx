import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';

function ProductCard() {
  return (
    <div className="product-card rounded-md shadow-md relative">
      <div className="card-img-container w-full block relative">
        <img
          src="https://www.weekdaygoods.com.au/cdn/shop/products/YESTERDAY_PINK_1.png"
          alt="product"
          className="product-card-img rounded-t-md w-full object-cover object-center h-52"
        />
      </div>
      <span className="absolute top-3 right-3 p-2 bg-red-600 text-white font-light rounded-2xl text-xs">
        10% Off
      </span>
      <div className="flex flex-col card-content p-4 gap-5">
        <div className="flex flex-row justify-between">
          <Link to="/">
            <h3 className="text-xl font-semibold">Product name</h3>
          </Link>

          <button
            type="button"
            aria-label="addToWishlist"
            className="rounded-lg p-2 bg-gray-200 text-black"
          >
            <FaRegHeart />
          </button>
        </div>
        <p className="text-sm font-light">
          Ullamco tempor duis mollit ullamco incididunt culpa elit commodo.
        </p>
        <div className="flex">
          <span className="text-xl font-medium">4.7</span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-xl leading-tight font-bold text-red-600">
            $12,099
            <span className="text-sm font-normal text-black ml-3">$18,999</span>
          </p>
          <button
            type="button"
            aria-label="addToCart"
            className="rounded-lg p-2 bg-violet-800 text-white"
          >
            <FiPlus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;
