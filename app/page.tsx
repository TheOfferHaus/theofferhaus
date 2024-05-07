import Header from "./sections/Header";
import Body from "./sections/Body";

function Home() {
  return (
    <section className="flex flex-col items-center min-h-screen mx-auto">
      <Header />
      <Body />
    </section>
  );
}

export default Home;
