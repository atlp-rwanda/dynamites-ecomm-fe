// src/pages/LandingPage.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MostPopular from './MostPopular';
import MostRecent from './MostRecent';
import MostSelling from './MostSelling';
import BannerAD from './BannerAD';
import { fetchAvailableProducts } from '@/features/Popular/availableProductSlice';
import { AppDispatch } from '../../app/store';

function PopularSection() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableProducts());
  }, [dispatch]);

  return (
    <section className=" h-auto md:pl-[30px] md:pr-[20px] md:pb-2 px-[20px]">
      <BannerAD />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-2">
        <MostPopular />
        <MostRecent />
        <MostSelling />
      </div>
    </section>
  );
}

export default PopularSection;
