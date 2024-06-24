import { Product } from '@/types/Product';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="shadow-lg rounded-lg relative">
      <img
        src={
          product.image.startsWith('https') || product.image.startsWith('/')
            ? product.image
            : 'https://imageplaceholder.net/600x500'
        }
        alt={product.name}
        className="w-full h-48 object-cover rounded-tl-md rounded-tr-md"
      />
      <span className="absolute top-4 right-4 text-white bg-red-600 py-1 px-4 font-thin rounded-xl text-sm">
        {`${Math.round((product.regularPrice - product.salesPrice) / product.regularPrice / 0.01)}% Off`}
      </span>
      <div
        className="p-2 flex flex-col gap-2"
        style={{
          fontFamily:
            'Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif',
        }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-600 cursor-pointer bg-gray-100 p-1"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.828q-1.601-1.593-2.528-2.81t-1.296-2.2T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.289Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98q-.369.986-1.296 2.202t-2.519 2.809q-1.592 1.592-4.06 3.828zm0-1.354q2.4-2.17 3.95-3.716t2.45-2.685t1.25-2.015Q20 9.006 20 8.15q0-1.5-1-2.5t-2.5-1q-1.194 0-2.204.682T12.49 7.385h-.978q-.817-1.39-1.817-2.063q-1-.672-2.194-.672q-1.48 0-2.49 1T4 8.15q0 .856.35 1.734t1.25 2.015t2.45 2.675T12 18.3m0-6.825"
            />
          </svg>
        </div>
        <p className="text-gray-400 tracking-wide font-light text-sm">
          {product.shortDesc}
        </p>
        <div className="flex items-center gap-2 py-2 w-fit">
          <div className="flex items-center font-medium gap-2 relative w-fit">
            <span className="text-xl">{product.averageRating}</span>

            {Array.from({ length: Math.floor(product.averageRating) }).map(
              (_, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
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
                // eslint-disable-next-line react/no-array-index-key
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
        <div className="flex items-center justify-between py-2">
          <div className="flex gap-4 items-center">
            <span className="text-red-700 font-bold text-2xl">
              ${product.salesPrice}
            </span>
            <span className="line-through text-gray-500">
              ${product.regularPrice}
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-white h-10 w-10 rounded p-2 cursor-pointer"
            viewBox="0 0 256 256"
            data-testid="addToCart"
            style={{ backgroundColor: '6D31ED' }}
          >
            <path
              fill="currentColor"
              d="M222 128a6 6 0 0 1-6 6h-82v82a6 6 0 0 1-12 0v-82H40a6 6 0 0 1 0-12h82V40a6 6 0 0 1 12 0v82h82a6 6 0 0 1 6 6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
