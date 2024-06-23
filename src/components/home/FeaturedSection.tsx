import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import ProductCard from './ProductCard';
import { RootState } from '@/app/store';
import { Product } from '@/types/Product';
import { useAppSelector } from '@/app/hooks';
import { selectProducts } from '@/features/Products/ProductSlice';

function FeaturedSection() {
  const products: Product[] = useAppSelector((state: RootState) =>
    selectProducts(state)
  );

  const featuredProducts = products.filter((product) => product.isFeatured);

  // Get the latest 4 products
  const latestProducts = featuredProducts.slice(0, 4);

  return (
    <div className="w-full mx-auto mt-8 md:mt-12 px-16">
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="flex flex-col lg:flex-row gap-2 md:gap-2 lg:gap-6 w-full md:w-3/4 items-center">
          <h2 className="text-3xl font-semibold text-black w-full lg:w-auto text-center md:text-left">
            Featured Products
          </h2>
          <p className="text-sm font-light text-black w-full lg:w-auto text-center md:text-left">
            Dont miss this opportunity at a special discount just for this week.
          </p>
        </div>
        <Link
          to="/shop"
          className="hidden md:flex items-center p-2 rounded-xl border-violet-700 border text-violet-700 text-sm hover:bg-violet-200"
        >
          View All <IoIosArrowForward />
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestProducts.length === 0 && (
          <div>
            <p className="text-center text-xl text-black">No Products Found</p>
          </div>
        )}
        {latestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedSection;
