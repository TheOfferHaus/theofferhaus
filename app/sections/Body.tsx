

const Body = () => {
    return (
      <div className="grid-rows-2">
        <div className="relative w-screen mx-auto px-4 sm:px-6 lg:px-8 bg-off-white py-6 rounded-3xl -mt-6 z-10">
          <div className="text-center mb-10">
            <h2 className="text-xl leading-tight">The simplest way to buy Real Estate.</h2>
            <h2 className="text-xl leading-tight">You take control of your transaction.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center items-center mb-2">
                <span className="">One platform for the entire process.</span>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center mb-2">
                <span className="">Simple price. You won't find any HUGE fees.</span>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center mb-2">
                <span className="">Full transaction, start to finish.</span>
              </div>
            </div>
          </div>
        </div>
        {/* Cards below for pricing options */}
        <div className="grid-cols-2">

        </div>
      </div>
    );
  }

  export default Body;
