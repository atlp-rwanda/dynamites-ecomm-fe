import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchProducts } from '@/features/availableProductSlice';
import {useAppSelector, useAppDispatch} from '@/app/hooks'
import PopilarTitle from './PopilarTitle';
import SingleItem from './Item';

const MostSelling: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { items, status } = useAppSelector(
    (state: RootState) => state.availableProducts
  );

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

  return (
    <div className=" flex flex-col mb-6">
      <PopilarTitle
        section={'Most Selling'}
        onLeftArrowClick={handleLeftallowclick}
        onRightArrowClick={handleRightallowclick}
      />

      <div className=" grid gap-y-2">
        {(status == 'failed' || status == 'loading') &&
          Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="border-2 px-[2px] shadow-lg animate-pulse bg-violet-50 flex flex-row justify-between items-center"
              >
                <div className=" h-[50px] w-[50px] rounded border shadow-lg animate-pulse"></div>
                <div className="flex flex-col justify-between py-2 pl-1 w-full">
                  <div className=" border-[1.5px] shadow-md animate-pulse h-[25px] w-full"></div>
                  <div className=" border-[1.5px] shadow-md  animate-pulse h-[20px] w-[50%]"></div>
                </div>
              </div>
            ))}

        {popularProducts.map((product) => (
          <SingleItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default MostSelling;