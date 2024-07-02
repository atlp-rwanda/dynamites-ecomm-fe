import leftIcon from '@/assets/icons/Left-Arrow.svg';
import rightIcon from '@/assets/icons/Right-Arrow.svg';

interface PopularTitleProps {
  section: string;
  onLeftArrowClick: () => void;
  onRightArrowClick: () => void;
}

function PopularTitle({
  section,
  onLeftArrowClick,
  onRightArrowClick,
}: PopularTitleProps) {
  return (
    <div className="flex justify-between">
      <div className="hover:scale-105">
        <p className="font-semibold text-xl">{section}</p>
        <p className="mb-4 border-b-primary border-b-4 pb-4"></p>
      </div>
      <div className="flex h-fit w-fit mt-2">
        <button
          type="button"
          onClick={onLeftArrowClick}
          className="hover:scale-125 cursor-pointer"
        >
          <img src={leftIcon} alt="Left Arrow Icon" />
        </button>
        <button
          type="button"
          onClick={onRightArrowClick}
          className="hover:scale-125 cursor-pointer"
        >
          <img src={rightIcon} alt="Right Arrow Icon" />
        </button>
      </div>
    </div>
  );
}

export default PopularTitle;
