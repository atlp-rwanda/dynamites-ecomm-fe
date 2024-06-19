import React, { useState } from 'react';
import HSButton from '@/components/form/HSButton';
import HelloImage from '@/assets/welcome.jpg';
import HelloImage1 from '@/assets/welcome1.png';
import HelloImage2 from '@/assets/welcome2.png';

import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

interface SlideProps {
  title: string;
  mainText: string[];
  buttonText: string;
  img: string;
}

const slides: SlideProps[] = [
  {
    title: 'Absolutely hot collections🔥',
    mainText: ['The Best Place To', 'Find And Buyer', 'Amazing Product'],
    buttonText: 'Shop now!',
    img: HelloImage,
  },
  {
    title: 'Exclusive Summer Sale☀️',
    mainText: ['Unbeatable Deals', 'On All Your', 'Favorite Items'],
    buttonText: 'Discover Now!',
    img: HelloImage1,
  },
  {
    title: 'New Arrivals✨',
    mainText: ['Fresh Styles', 'Just Landed', 'Shop Today'],
    buttonText: 'Explore New!',
    img: HelloImage2,
  },
];

const Slide: React.FC<{ slide: SlideProps }> = ({ slide }) => (
  <div className="w-full h-auto flex flex-col p-5  gap-10 lg:flex-row md:flex-row bg-white">
    <div className="w-full pl-0 pt-10 md:w-1/2 flex h-auto flex-col flex-1 lg:pl-10 md:pl-0">
      <h2 className="flex justify-center text-[#171A1F] text-[18px] mb-4 lg:justify-start items-start">
        {slide.title}
      </h2>
      <div>
        {slide.mainText.map((text, index) => (
          <p
            key={index}
            className="text-[28px] flex justify-center items-center md:text-[40px] font-extrabold lg:justify-start lg:items-start"
          >
            {index === 2 ? (
              <>
                <span className="mr-2">{text.split(' ')[0]}</span>
                <span className="text-[#15ABFF]">{text.split(' ')[1]}</span>
              </>
            ) : (
              text
            )}
          </p>
        ))}
      </div>
      <div className="flex justify-center lg:justify-start">
        <HSButton
          title={slide.buttonText}
          styles="hidden bg-[#6D31ED] w-auto text-white p-3 outline-none rounded-md mt-4 lg:flex md:flex"
        />
      </div>
    </div>
    <div className="lg:w-1/2 md:w-1/2 h-auto  flex-1 lg:flex md:flex">
      <img src={slide.img} alt="Slide Image" className="h-full" />
    </div>
  </div>
);

const HelloSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full">
            <Slide slide={slide} />
          </div>
        ))}
      </div>

      <div className="flex justify-center lg:justify-start">
        <HSButton
          title={slides[currentIndex].buttonText}
          styles="flex bg-[#6D31ED]] w-auto text-white outline-none rounded-md  lg:hidden md:hidden"
        />
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-[-10px] transform -translate-y-1/2 p-4 outline-none font-bold text-[20px]"
        title="Previous Slide"
      >
        <SlArrowLeft />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-[-10px] transform -translate-y-1/2 p-4 outline-none font-bold text-[20px]"
        title="Next Slide"
      >
        <SlArrowRight />
      </button>
      <div className="relative bottom-[0]  left-1/2 transform -translate-x-1/2  space-x-2 p-5 flex flex-row justify-center items-center">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-[#6D31ED]' : 'bg-gray-300'}`}
            data-testid={`active-indicator-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export { HelloSection };
