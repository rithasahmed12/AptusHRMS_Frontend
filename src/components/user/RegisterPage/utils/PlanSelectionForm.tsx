import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { setCustomerInfo } from "../../../../redux/slices/userSlice/customerSlice";
import { getPricingPlans } from "../../../../api/user";
import { toast } from "react-toastify";

interface Plans {
  _id: string;
  plan_name: string;
  plan_price: number;
  duration: number;
  max_employees: number;
}

const PlanSelectionForm = () => {
  const [selectedPlan, setSelectedPlan] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const { customerInfo } = useSelector((state: any) => state.customerInfo);

  const dispatch = useDispatch();

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

  const handlePlanSelection = (plan: Plans) => {
    setSelectedPlan(plan);
  };

  const handlePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PFECGSI3gvqBtnxfT10qd93tAnsrH6UWirm6pUbhLSREpxNzRZBhJraLQDOcTVcnTOxAJwZk3sST3ONFaexEPmH006hjb3bCS"
    );
    const body = {
      product: selectedPlan,
      customer: customerInfo,
    };

    setIsLoading(true);

    const response = await fetch(
      "http://localhost:3001/payment/checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "Application/JSON" },
        body: JSON.stringify(body),
      }
    );

    if (response.status === 409) {
      const data = await response.json();
      if (data && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } else {
      const session = await response.json();

      stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      setIsLoading(false);

      dispatch(
        setCustomerInfo({
          name: customerInfo.name,
          mobile: customerInfo.mobile,
          domain: customerInfo.domain,
          email: customerInfo.email,
          password: customerInfo.password,
          success: true,
        })
      );
    }
  };

  return (
    <div className="flex justify-center flex-wrap gap-4">
      <h1 className="text-brown-dark text-2xl font-semibold text-center">
        Choose Plan
      </h1>
      <div className="overflow-y-scroll w-full h-[500px] p-4">
        {plans.map((plan: Plans) => (
          <div 
            key={plan._id}
            className={`bg-white rounded-md shadow-md mb-4 w-full`}
          >
            <label className="block p-4">
              <input
                type="radio"
                value={plan._id}
                checked={selectedPlan?._id === plan._id}
                onChange={() => handlePlanSelection(plan)}
                className="mr-2"
              />
              <div className="text-lg font-semibold mb-2">{plan.plan_name}</div>
              <div className="text-gray-600 mb-2">${plan.plan_price}</div>
              <div className="text-gray-600">{plan.max_employees} employees, {plan.duration} days</div>
            </label>
          </div>
        ))}
      </div>
      <button
        disabled={isLoading}
        style={isLoading ? { backgroundColor: "#7D6464" } : {}}
        onClick={handlePayment}
        className="bg-brown-dark w-[200px] text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center"
      >
         {isLoading && (
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            )}
        Confirm Plan
        
      </button>
    </div>
  );
};

export default PlanSelectionForm;
