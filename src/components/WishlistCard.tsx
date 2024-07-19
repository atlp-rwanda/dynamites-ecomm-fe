import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Button from './form/Button';
import { Product } from '@/types/Product';
import { removeFromWishlist } from '@/features/Products/ProductSlice';

function WishlistCard({ product }: { product: Product }) {
  const { token } = useAppSelector((state) => state.signIn);
  const dispatch = useAppDispatch();
  return (
    <div className="relative flex bg-wishlistBg xs:w-full md:w-[30rem] h-60 p-2 pb-4">
      <IoClose
        size={20}
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => dispatch(removeFromWishlist({ token, id: product.id }))}
      />
      <div className="flex w-2/5">
        <img
          src={product.image}
          alt="wishlistImage"
          className="w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-4 w-3/5 pl-2">
        <h1 className="text-grey font-semibold">
          {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
        </h1>
        <h2 className="text-grey font-normal">
          {product.name.slice(0, 20)}
          {product.name.length > 20 ? '...' : ''}
        </h2>
        <div className="flex items-center font-medium gap-2 relative w-fit">
          <div className="flex items-center font-medium gap-2 relative w-fit">
            <span className="">{product.averageRating}</span>
            {Array.from({ length: Math.floor(product.averageRating) }).map(
              (_, index) => {
                return (
                  <div data-testid="ratingStar" key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-400"
                      viewBox="0 0 36 36"
                    >
                      <path
                        fill="currentColor"
                        d="M27.287 34.627c-.404 0-.806-.124-1.152-.371L18 28.422l-8.135 5.834a1.97 1.97 0 0 1-2.312-.008a1.971 1.971 0 0 1-.721-2.194l3.034-9.792l-8.062-5.681a1.98 1.98 0 0 1-.708-2.203a1.978 1.978 0 0 1 1.866-1.363L12.947 13l3.179-9.549a1.976 1.976 0 0 1 3.749 0L23 13l10.036.015a1.975 1.975 0 0 1 1.159 3.566l-8.062 5.681l3.034 9.792a1.97 1.97 0 0 1-.72 2.194a1.957 1.957 0 0 1-1.16.379"
                      />
                    </svg>
                  </div>
                );
              }
            )}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 36 36"
                data-testid="halfStar"
              >
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop
                      offset={`${(product.averageRating - Math.floor(product.averageRating)) * 100}%`}
                      style={{
                        stopColor: 'rgb(250 204 21)',
                        stopOpacity: 1,
                      }}
                    />
                    <stop
                      offset={`${(product.averageRating - Math.floor(product.averageRating)) * 100}%`}
                      style={{
                        stopColor: 'rgb(156 163 175)',
                        stopOpacity: 1,
                      }}
                    />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#grad1)"
                  d="M27.287 34.627c-.404 0-.806-.124-1.152-.371L18 28.422l-8.135 5.834a1.97 1.97 0 0 1-2.312-.008a1.971 1.971 0 0 1-.721-2.194l3.034-9.792l-8.062-5.681a1.98 1.98 0 0 1-.708-2.203a1.978 1.978 0 0 1 1.866-1.363L12.947 13l3.179-9.549a1.976 1.976 0 0 1 3.749 0L23 13l10.036.015a1.975 1.975 0 0 1 1.159 3.566l-8.062 5.681l3.034 9.792a1.97 1.97 0 0 1-.72 2.194a1.957 1.957 0 0 1-1.16.379"
                />
              </svg>
            </div>
          </div>
          {Array.from({ length: Math.floor(4 - product.averageRating) }).map(
            (_, index) => {
              return (
                <div data-testid="emptyStar" key={index}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    viewBox="0 0 36 36"
                  >
                    <path
                      fill="currentColor"
                      d="M27.287 34.627c-.404 0-.806-.124-1.152-.371L18 28.422l-8.135 5.834a1.97 1.97 0 0 1-2.312-.008a1.971 1.971 0 0 1-.721-2.194l3.034-9.792l-8.062-5.681a1.98 1.98 0 0 1-.708-2.203a1.978 1.978 0 0 1 1.866-1.363L12.947 13l3.179-9.549a1.976 1.976 0 0 1 3.749 0L23 13l10.036.015a1.975 1.975 0 0 1 1.159 3.566l-8.062 5.681l3.034 9.792a1.97 1.97 0 0 1-.72 2.194a1.957 1.957 0 0 1-1.16.379"
                    />
                  </svg>
                </div>
              );
            }
          )}
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-red-700 font-bold text-lg">
            ${product.salesPrice}
          </span>
          <span className="line-through text-gray-500">
            ${product.regularPrice}
          </span>
        </div>
        <Button title="Add to Cart" />
      </div>
    </div>
  );
}

export default WishlistCard;
