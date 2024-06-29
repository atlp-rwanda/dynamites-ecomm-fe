import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchProducts } from '@/app/bannerAds/BannerSlice';
import BannerAd from '@/components/bannerAds/bannerAds';

function BannerSection() {
  const dispatch: AppDispatch = useDispatch();
  const { items: banners } = useSelector((state: RootState) => state.banners);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap justify-center gap-8 ">
      {banners.map((banner) => (
        <BannerAd
          key={banner.id}
          s_title="Only This Week"
          title={banner.name}
          description={banner.shortDesc}
          image={banner.image}
        />
      ))}
    </div>
  );
}

export default BannerSection;
