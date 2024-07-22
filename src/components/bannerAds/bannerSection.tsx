import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchBannerProducts } from '@/app/bannerAds/BannerSlice';
import BannerAd from '@/components/bannerAds/bannerAds';

function BannerSection() {
  const dispatch: AppDispatch = useDispatch();
  const { items: banners } = useSelector((state: RootState) => state.banners);

  useEffect(() => {
    dispatch(fetchBannerProducts());
  }, [dispatch]);

  return (
    <div className="w-full flex justify-center xs:px-4 lg:p-0">
      <div className="flex lg:w-[90%] xs:w-full flex-wrap md:flex-nowrap justify-center gap-8">
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
    </div>
  );
}

export default BannerSection;
