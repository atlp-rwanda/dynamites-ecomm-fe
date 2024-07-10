import CartItem from './CartItem';
import HSButton from '../form/HSButton';

export default function Cart() {
  return (
    <div className="flex flex-col max-w-screen-lg mx-auto">
      <div className="flex w-full justify-end items-center pr-32 md:pr-48 py-6">
        <h1 className="text-2xl font-bold px-8">Products in cart</h1>
        <div className="flex gap-48 text-sm font-light text-gray-500">
          <span>3 products</span>
          <button type="button" className="flex gap-2">
            <span>View all</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66699 12.9273L5.73972 14L11.7397 8L5.73972 2L4.66699 3.07273L9.59423 8L4.66699 12.9273Z"
                fill="#9095A1"
              />
            </svg>
            <span className="hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="w-fit">
        <CartItem price={59.2} name="Canon Camera" />
        <CartItem price={47} name="Galaxy Fold Z6" />
        <CartItem price={98} name="Digital Television" />
        <div className="flex justify-end gap-20 py-6 items-center">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl font-bold text-gray-900">Total:</h2>
            <span className="text-xl font-medium text-primary">$20088</span>
          </div>
          <HSButton title="CHECKOUT" />
        </div>
      </div>
    </div>
  );
}
