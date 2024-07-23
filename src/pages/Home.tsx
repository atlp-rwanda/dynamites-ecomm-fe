import { useEffect } from 'react';
import CategoriesSection from '@/components/home/categories';
import HelloSection from '../components/HelloSection/HelloSection';
import BannerSection from '@/components/bannerAds/bannerSection';
import PopularSection from '@/components/Popular/Popular_section';
import BestSellerSection from '../components/home/BestSellerSection';
import FeaturedSection from '../components/home/FeaturedSection';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchWishlistProducts } from '@/features/Products/ProductSlice';

function Home() {
  const { token } = useAppSelector((state) => state.signIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWishlistProducts(token));
  }, [dispatch, token]);

  return (
    <main>
      <div className="relative w-full bg-violeteBg h-auto p-2 lg:pl-10 lg:pr-10 lg:pt-10 lg:pb-0 md:pl-10 md:pt-10 md:pr-10 md:pb-0 ">
        <HelloSection />
      </div>
      <div>
        <CategoriesSection />
      </div>
      <div className="flex w-full h-auto py-8">
        <BannerSection />
      </div>
      <FeaturedSection />
      <BestSellerSection />
      <div className="w-full bg-white px-10 pb-10 pt-2">
        <PopularSection></PopularSection>
      </div>
    </main>
  );
}
export default Home;
