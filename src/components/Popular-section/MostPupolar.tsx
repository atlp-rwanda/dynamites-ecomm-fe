// src/components/MostPopular/MostPopular.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
// import { fetchProducts } from '../../redux/reducers/RecentProductsSlice';
import { fetchReviews } from '../../redux/reducers/PopularProducts';
import { filterPopular } from '../../utils/filterMostPopular';
import leftIcon from '../../assets/icon/Left-Arrow.svg';
import righttIcon from '../../assets/icon/Right-Arrow.svg';
import SingleItem from './item';
import { skip } from 'node:test';

const MostPopular: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { reviews, status } = useSelector((state: RootState) => state.Reviews);

  const { items } = useSelector((state: RootState) => state.Popularproducts);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);
  // -----------------------------------------
  const CopyOfreview = [...reviews];

  const { mostPopularProducts } = filterPopular(CopyOfreview, [...items]);

  // -----------------------------------------
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
    if (end <= mostPopularProducts.length) {
      setEnd(end + 3);
      setStart(start + 3);
    }
  };

  const mostPopularProduct = mostPopularProducts.slice(start, end);

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
        {mostPopularProduct.map((product) => (
          <SingleItem
            key={product?.id}
            product={product ? product : items[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default MostPopular;
