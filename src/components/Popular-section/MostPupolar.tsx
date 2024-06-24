// src/components/MostPopular/MostPopular.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchProducts } from '../../redux/reducers/RecentProductsSlice';
import leftIcon from '../../assets/icon/Left-Arrow.svg';
import righttIcon from '../../assets/icon/Right-Arrow.svg';
import SingleItem from './item';
import Review from '@/Interfaces/reviews';

const MostPopular: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, status } = useSelector(
    (state: RootState) => state.Popularproducts
  );
  const { reviews } = useSelector((state: RootState) => state.Reviews);
  // ---------------------------------------------------

  function calculateAverageRating(
    reviews: Review[],
    productName: string
  ): number {
    const filteredReviews = reviews.filter(
      (review) => review.product.name === productName
    );
    if (filteredReviews.length === 0) {
      return 0;
    }

    const totalRating = filteredReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / filteredReviews.length;
  }

  // ----------------------------------------------------

  const SortedProductNames = async () => {
    const uniqueProductNames = Array.from(
      new Set([...reviews].map((review) => review.product.name))
    );

    const sortedProductNames = uniqueProductNames.sort((a, b) => {
      const avgRatingA = calculateAverageRating(reviews, a);
      const avgRatingB = calculateAverageRating(reviews, b);
      return avgRatingB - avgRatingA;
    });
    console.log(sortedProductNames);
    return sortedProductNames;
  };

  SortedProductNames;
  // ---------------------------------------------------

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);

  const handleLeftallowclick = async () => {
    if (start > 0) {
      setEnd(end - 3);
      setStart(start - 3);
    } else {
      setEnd(3);
      setStart(0);
    }
  };

  const handleRightallowclick = async () => {
    if (end <= items.length) {
      setEnd(end + 3);
      setStart(start + 3);
    }
  };

  const popularProducts = items.slice(start, end);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to load products.</div>;
  }

  return (
    <div className=" flex flex-col mb-6">
      <div className=" flex justify-between">
        <div className="">
          <p className=" font-semibold text-xl">Most Popular</p>
          <p className="mb-4 border-b-primary border-b-4 pb-4"></p>
        </div>
        <div className=" flex h-fit w-fit mt-2">
          <img
            src={leftIcon}
            alt="Left Allow Icon"
            onClick={handleLeftallowclick}
          />
          <img
            src={righttIcon}
            alt="Right Allow Icon"
            onClick={handleRightallowclick}
          />
        </div>
      </div>

      <div className=" bg-white grid gap-y-2">
        {popularProducts.map((product) => (
          <SingleItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MostPopular;
