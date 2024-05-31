import HomeHeader from "../components/HomeHeader";
import Body from "../components/Body";

function Home() {
  return (
    <section className="flex flex-col items-center min-h-screen mx-auto">
      <HomeHeader />
      <Body />
    </section>
  );
}

export default Home;
