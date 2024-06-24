import CategoriesSection from '@/components/home/categories';
import HelloSection from '../components/HelloSection/HelloSection';

function Home() {
  return (
    <main className=" relative w-full h-auto p-2 bg-violeteBg lg:p-10 md:p-10">
      <div>
        <HelloSection />
      </div>
      <div>
        <CategoriesSection />
      </div>
    </main>
  );
}

export default Home;
