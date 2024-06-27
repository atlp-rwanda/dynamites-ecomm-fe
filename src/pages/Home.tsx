import HelloSection from '../components/HelloSection/HelloSection';
import HomeFeaturedSection from '../components/FeaturedSection';
import BestSellerSection from '../components/BestSellerSection';

function Home() {
  return (
    <main className=" relative w-full h-auto p-2 bg-violeteBg lg:p-10 md:p-10">
      <div>
        <HelloSection />
      </div>
      {/* Add more componets as you wish!!! */}
      <HomeFeaturedSection />
      <BestSellerSection />
    </main>
  );
}

export default Home;
