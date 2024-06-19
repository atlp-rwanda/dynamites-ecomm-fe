import { HelloSection } from '../components/HelloSection/HelloSection';
function Home() {
  return (
    <main className=" relative w-full h-auto p-2  lg:p-10 md:p-10 bg-violeteBg">
      <div>
        <HelloSection />
      </div>
      {/* Add more componets as you wish!!! */}
    </main>
  );
}

export default Home;
