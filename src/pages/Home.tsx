import HelloSection from '../components/HelloSection/HelloSection';
import PopularSection from '../components/Popular-section/Popular_section';

function Home() {
  return (
    <main className=" relative w-full h-auto p-2 bg-violeteBg lg:p-10 md:p-10">
      <div>
        <HelloSection />
      </div>
      <PopularSection></PopularSection>
    </main>
  );
}

export default Home;
