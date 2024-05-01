"use client";

import AnimatedButton from "@/components/AnimatedButton";
import CardArea from "@/components/CardArea";
import Footer from "@/components/Footer";

/** Home:  Component for the home page of the OfferHaus website.
 *
 * Home -> {AnimatedButton, CardArea, Footer}
 *
 * Props: None
 * State: None
 */

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8 py-20 max-w-4xl mx-auto">
      <div className="text-center justify-between mx-auto">
        <h1 className="text-8xl">OfferHaus</h1>
      </div>
      <div className="flex mx-auto items-center flex-col gap-8">
        <h3 className="text-xl">
          Simple, safe, and successful offer options for your new home!
        </h3>
        <AnimatedButton />
      </div>
      <CardArea />
      <Footer />
    </main>
  );
}

export default Home;
