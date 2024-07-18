import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import WishlistCard from '@/components/WishlistCard';
import { fetchWishlistProducts } from '@/features/Products/ProductSlice';

function Wishlist() {
  const dispatch = useAppDispatch();
  const { wishlistProducts } = useAppSelector((state) => state.products);
  const { token } = useAppSelector((state) => state.signIn);

  useEffect(() => {
    dispatch(fetchWishlistProducts(token));
  }, [dispatch, token]);

  return (
    <div className="flex flex-col w-full min-h-80 p-8 gap-8">
      <h1 className="text-2xl font-semibold">
        My Wishlist{' '}
        <span className="text-grey">({wishlistProducts?.length} items)</span>
      </h1>
      <div className="w-full flex flex-wrap gap-4">
        {wishlistProducts.length === 0 && (
          <div className="text-grey font-medium">
            You currently have no products in your wishlist
          </div>
        )}
        {wishlistProducts.map((product) => (
          <WishlistCard product={product} key={crypto.randomUUID()} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
