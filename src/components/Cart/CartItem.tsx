import { useState } from 'react';

interface CartProps {
  price: number;
  name: string;
}

function CartItem({ price, name }: CartProps) {
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState<'M' | 'S' | 'L'>('M');

  const handleQuantityChange = (amount: number) => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity + amount));
  };

  const handleSize = (newSize: 'M' | 'S' | 'L') => {
    setSize(newSize);
  };

  return (
    <div className="flex items-center border-b border-gray-400 pt-8 pb-4 h-max max-w-screen-md">
      <img
        src="/product.svg"
        alt="Product"
        className="w-48 h-32 object-cover rounded-md"
      />
      <div className="flex flex-col flex-grow w-full justify-between px-8">
        <span className="font-bold text-2xl">{name}</span>
        <div className="flex justify-between">
          <div className="flex items-center gap-4 py-2 flex-col">
            <span className="text-gray-600 text-center w-full text-sm">
              Color
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="w-6 h-6 rounded-full border-2 border-primary bg-white"
              >
                {' '}
              </button>
              <button
                type="button"
                className="w-6 h-6 rounded-full border-2 border-primary bg-gray-200"
              >
                {' '}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 py-2 flex-col">
            <span className="text-gray-600 text-center text-sm">Size</span>
            <div className="flex">
              <button
                onClick={() => handleSize('L')}
                type="button"
                className={`px-3 text-sm py-1 border border-primary ${size === 'L' ? 'text-white bg-primary' : 'text-gray-600'}`}
              >
                L
              </button>
              <button
                onClick={() => handleSize('M')}
                type="button"
                className={`px-3 text-sm py-1 border border-primary ${size === 'M' ? 'text-white bg-primary' : 'text-gray-600'}`}
              >
                M
              </button>
              <button
                onClick={() => handleSize('S')}
                type="button"
                className={`px-3 text-sm py-1 border border-primary ${size === 'S' ? 'text-white bg-primary' : 'text-gray-600'}`}
              >
                S
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 py-2 flex-col text-gary-600 text-sm">
            <span className="text-gray-600 text-center">Quantity</span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 bg-gray-100 rounded-md"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 bg-gray-100 rounded-md"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 py-4 items-end w-64 justify-between">
        <button type="button" className="text-red-500 text-lg font-medium">
          Remove
        </button>
        <span className="font-bold text-xl mt-4">${price * quantity}</span>
      </div>
    </div>
  );
}

export default CartItem;
