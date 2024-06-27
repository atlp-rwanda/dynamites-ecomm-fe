// src/pages/LandingPage.tsx
import React from 'react';
import MostPopular from './MostPupolar';
import MostRecent from './MostRecent';
import MostSelling from './MostSelling';
import BannerAD from './BannerAD';

const PopularSection: React.FC = () => {
  return (
    <section className=" h-auto md:pl-[30px] md:pr-[20px] md:pb-2 px-[20px]">
      <BannerAD></BannerAD>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-2">
        <MostPopular />
        <MostRecent />
        <MostSelling />
      </div>
    </section>
  );
};

export default PopularSection;
