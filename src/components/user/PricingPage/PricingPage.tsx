import NavBar from "../common/NavBar";
import PlanContainer from "../common/PlanContainer";
import Footer from "../common/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPricingPlans } from "../../../api/user";

interface Plans {
  _id: string,
  plan_name: string,
  duration: number,
  max_employees: number,
  plan_price: number,
  is_listed: boolean,
}

const PricingPage = () => {
  const [plans, setPlans] = useState<Plans[]>([]);

  const fetchPlans = async () => {
    try {
      const response = await getPricingPlans();
      console.log(response?.data);
      setPlans(response?.data);
    } catch (error) {
      toast.error('Error Fetching Data');
    }
  }

  useEffect(() => {
    fetchPlans();
  }, [])

  return (
    <>
      <NavBar />
      <div className="h-[350px] bg-snow text-center flex flex-col justify-center items-center">
        <h1 className="font-bold lg:text-3xl text-brown-dark md:text-2xl sm:text-lg mb-4">
          Pricing
        </h1>
        <p>
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
      <div className="flex justify-center mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {plans.map((plan: Plans, index) => (
            <PlanContainer
              key={plan._id}
              color={index % 2 === 0 ? "white" : "brown"} // Alternate colors or use any logic to determine color
              planName={plan.plan_name}
              days={plan.duration}
              employeeCount={plan.max_employees}
              price={plan.plan_price}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;
