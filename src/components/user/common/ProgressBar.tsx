

const ProgressBar = () => {
    return (
        <div className="flex h-[130px] bg-brown-dark justify-center items-center gap-8 md:gap-24">
        <div className="flex flex-col items-center">
          <h1 className="text-snow font-medium text-xl sm:text-3xl">30,000+</h1>
          <h2 className="text-snow text-sm md:text-lg">customers</h2>
        </div>
        <div className="hidden sm:block border-l-2 border-snow h-[60px]"></div> {/* Vertical line */}
        <div className="flex flex-col items-center">
          <h1 className="text-snow font-medium text-xl sm:text-3xl">3,30,000+</h1>
          <h2 className="text-snow text-sm md:text-lg">employees</h2>
        </div>
        <div className="hidden sm:block border-l-2 border-snow h-[60px]"></div> {/* Vertical line */}
        <div className="flex flex-col items-center">
          <h1 className="text-snow font-medium text-xl sm:text-3xl">22+</h1>
          <h2 className="text-snow text-sm sm:text-lg">state</h2>
        </div>
      </div>
      
      );
}

export default ProgressBar