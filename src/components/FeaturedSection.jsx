import { IoIosArrowForward } from 'react-icons/io';
import ProductCard from './productCard';

function HomeFeaturedSection() {
  return (
    <div className="w-full mx-auto mt-8">
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="flex flex-col lg:flex-row gap-2 md:gap-2 lg:gap-6 w-full md:w-3/4 items-center">
          <h2 className="text-3xl font-semibold text-black w-full lg:w-auto text-center md:text-left">
            Featured Products
          </h2>
          <p className="text-sm font-light text-black w-full lg:w-auto text-center md:text-left">
            Do not miss the current offers until the end of March.
          </p>
        </div>
        <a
          href="#"
          className="hidden md:flex items-center p-2 rounded-xl border-violet-700 border text-violet-700 text-xs "
        >
          View All <IoIosArrowForward />
        </a>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default HomeFeaturedSection;
