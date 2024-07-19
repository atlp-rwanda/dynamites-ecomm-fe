import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import PopilarTitle from './PopilarTitle';
import SingleItem from './Item';

function MostSelling() {
  const { availableProduct, status } = useSelector(
    (state: RootState) => state.availableProducts
  );

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
    if (end < availableProduct.length) {
      setEnd(end + 3);
      setStart(start + 3);
    }
  };

  const popularProducts = availableProduct.slice(start, end);

  return (
    <div className=" flex flex-col mb-6">
      <PopilarTitle
        section="Most Selling"
        onLeftArrowClick={handleLeftallowclick}
        onRightArrowClick={handleRightallowclick}
      />

      <div className=" grid gap-y-2">
        {status === 'loading' &&
          Array(3)
            .fill(null)
            .map(() => (
              <div
                key={1}
                className="border-2 px-[2px] shadow-lg animate-pulse bg-violet-50 flex flex-row justify-between items-center"
                role="status"
              >
                <div className=" h-[50px] w-[50px] rounded border shadow-lg animate-pulse"></div>
                <div className="flex flex-col justify-between py-2 pl-1 w-full">
                  <div className=" border-[1.5px] shadow-md animate-pulse h-[25px] w-full"></div>
                  <div className=" border-[1.5px] shadow-md  animate-pulse h-[20px] w-[50%]"></div>
                </div>
              </div>
            ))}

        {status === 'failed' &&
          Array(3)
            .fill(null)
            .map(() => (
              <div
                key={1}
                className="border-2 px-[2px] h-[50px] shadow-lg animate-pulse bg-violet-50 flex flex-row justify-between items-center"
              >
                Loading Failed...
              </div>
            ))}

        {popularProducts.map((product) => (
          <SingleItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default MostSelling;
