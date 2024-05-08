import Header from "../components/Header";
import Body from "../components/Body";

function Home() {
  return (
    <section className="flex flex-col items-center min-h-screen mx-auto">
      <Header />
      <Body />
    </section>
  );
}

export default Home;
