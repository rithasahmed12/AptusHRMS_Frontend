import NavBar from "../common/NavBar";
import PlanContainer from "../common/PlanContainer";
import Footer from "../common/Footer";

const PricingPage = () => {
  return (
    <>
      <NavBar />
      <div className="h-[350px] bg-snow text-center flex flex-col justify-center items-center">
        <h1 className="font-bold lg:text-3xl text-brown-dark md:text-2xl sm:text-lg mb-4">
          Pricing
        </h1>
        <p>
          {" "}
          Affordable pricing tailored to fit your business needs. Take the
          hassle out of HR management <br /> and unlock your team's full
          potential today!
        </p>
      </div>
      <div className="text-center mt-10 mb-10">
        <h1 className="font-bold lg:text-3xl text-brown-dark md:text-2xl sm:text-lg">
          Choose the best plan for you
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:justify-center md:gap-7 mb-12">
        <PlanContainer
          color="white"
          planName="Free Trial"
          days={7}
          employeeCount={10}
          price={0}
        />
        <PlanContainer
          color="brown"
          planName="Standard"
          days={28}
          employeeCount={50}
          price={2999}
        />
        <PlanContainer
          color="white"
          planName="Professional"
          days={28}
          employeeCount={100}
          price={4999}
        />
      </div>

      <Footer />
    </>
  );
};

export default PricingPage;
