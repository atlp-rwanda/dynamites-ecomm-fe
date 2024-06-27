import React from 'react';
import leftIcon from '../../assets/icon/Left-Arrow.svg';
import rightIcon from '../../assets/icon/Right-Arrow.svg';

interface PopularTitleProps {
  section: string;
  onLeftArrowClick: () => void;
  onRightArrowClick: () => void;
}

const PopularTitle: React.FC<PopularTitleProps> = ({
  section,
  onLeftArrowClick,
  onRightArrowClick,
}) => {
  return (
    <div className="flex justify-between">
      <div className="hover:scale-105">
        <p className="font-semibold text-xl">{section}</p>
        <p className="mb-4 border-b-primary border-b-4 pb-4"></p>
      </div>
      <div className="flex h-fit w-fit mt-2">
        <img
          src={leftIcon}
          alt="Left Arrow Icon"
          onClick={onLeftArrowClick}
          className="hover:scale-125 cursor-pointer"
        />
        <img
          src={rightIcon}
          alt="Right Arrow Icon"
          onClick={onRightArrowClick}
          className="hover:scale-125 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PopularTitle;
