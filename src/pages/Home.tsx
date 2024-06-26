import HelloSection from '../components/HelloSection/HelloSection';

function Home() {
  return (
    <main className=" relative w-full h-auto p-2 bg-violeteBg lg:p-10 md:p-10">
      <div>
        <HelloSection />
        <h2>welcome to home</h2>
      </div>
      {/* Add more componets as you wish!!! */}
    </main>
  );
}

export default Home;
