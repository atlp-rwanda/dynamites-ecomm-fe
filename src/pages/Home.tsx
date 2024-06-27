import HelloSection from '../components/HelloSection/HelloSection';
import PopularSection from '../components/Popular-section/Popular_section';

function Home() {
  return (
    <main >
      <div className=" relative w-full h-auto p-2 bg-violeteBg lg:p-10 md:p-10">
        <HelloSection />
      </div>
      <div className='w-full bg-white px-8 pb-10 pt-2'>
         <PopularSection></PopularSection>
      </div>
    </main>
  );
}

export default Home;
