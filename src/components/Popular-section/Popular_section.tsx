// src/pages/LandingPage.tsx
import React from 'react';
import MostPopular from './MostPupolar';
import MostRecent from './MostRecent';
import MostSelling from './MostSelling';
import ADImage from '../../assets/image/Rectangle 901.svg';

const PopularSection: React.FC = () => {
  return (
    <section className=" h-auto md:px-[60px] md:pt-5 md:pb-8 px-[30px] pt-5 pb-8">
      <div className=" bg-thinorenge flex flex-row justify-between rounded-xl items-center border-thickorenge border ">
        <div className=" flex flex-col ml-5 mb-3">
          <div className="">
            <p className=" text-thickorenge text-sm font-bold">
              In store or online your health & safety is our priority
            </p>
          </div>
          <div className="">
            <p className=" text-black text-xs">
              The only E-commerce that makes your life easier, makes you enjoy
              life and makes it bette
            </p>
          </div>
        </div>
        <div className=" h-full flex items-center">
          <img
            src={ADImage}
            alt="AD image"
            className=" h-full w-auto object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <MostPopular />
        <MostRecent />
        <MostSelling />
      </div>
    </section>
  );
};

export default PopularSection;
