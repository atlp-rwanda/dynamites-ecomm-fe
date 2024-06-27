// src/components/MostPopular/MostPopularItem.tsx
import React from 'react';
import { Product } from '@/types/product';

interface MostPopularItemProps {
  product: Product;
}

const SingleItem: React.FC<MostPopularItemProps> = ({ product }) => {
  return (
    <div className=" flex flex-row hover:scale-105  hover:translate-y-0.5 hover:translate-x-0.5">
      <div className=" max-h-20 max-w-20 ">
        <img src={product.image} alt={product.name} className=" rounded" />
      </div>
      <div className=" flex flex-col justify-between py-2 pl-1">
        <div>
          <h3 className=" font-[600] text-lg">{product.name}</h3>
        </div>
        <div className=" flex flex-row">
          <p className="text-redBg font-medium text-base">
            ${product.salesPrice}
          </p>
          <p className=" text-redBg pl-2 line-through opacity-60 text-sm">
            ${product.regularPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
