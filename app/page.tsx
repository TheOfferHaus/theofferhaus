import Header from "./sections/Header";
import Body from "./sections/Body";

function Home() {
  return (
    <section className="flex flex-col items-center h-screen justify-start px-8 py-20 max-w-4xl mx-auto">
      <Header />
      <Body />
    </section>
  );
}

export default Home;
