import CategoriesSection from '@/components/home/categories';
import HelloSection from '../components/HelloSection/HelloSection';
import BannerSection from '@/components/bannerAds/bannerSection';
import PopularSection from '@/components/Popular/Popular_section';

function Home() {
  return (
    <main>
      <div className="relative w-full bg-violeteBg h-auto p-2 lg:pl-10 lg:pr-10 lg:pt-10 lg:pb-0 md:pl-10 md:pt-10 md:pr-10 md:pb-0 ">
        <HelloSection />
      </div>
      <div>
        <CategoriesSection />
      </div>
      <div className="flex w-full h-auto p-8 ">
        <BannerSection />
      </div>
      <div className="w-full bg-white px-8 pb-10 pt-2">
        <PopularSection></PopularSection>
      </div>
      {/* Add more componets as you wish!!! */}
    </main>
  );
}
export default Home;
