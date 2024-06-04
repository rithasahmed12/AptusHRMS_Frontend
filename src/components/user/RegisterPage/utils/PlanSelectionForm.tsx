import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

interface Plans {
  id: string;
  name: string;
  price: number;
  description: string;
}

const PlanSelectionForm = () => {
  const [selectedPlan, setSelectedPlan] = useState({});

  const { customerInfo } = useSelector((state: any) => state.customerInfo);


  const planData = [
    { id:'1',name: 'Free Trial', price: 0, description: '10 employees, 7 days',duration:7},
    { id:'2',name: 'Standard', price: 2999, description: '50 employees, 28 days',duration:28},
    { id:'3',name: 'Professional', price: 4999, description: '100 employees, 28 days',duration:28},
  ];

  const handlePlanSelection = (plan: Plans) => {
    setSelectedPlan(plan);
  };

  const handlePayment = async () => {
  
      const stripe = await loadStripe('pk_test_51PFECGSI3gvqBtnxfT10qd93tAnsrH6UWirm6pUbhLSREpxNzRZBhJraLQDOcTVcnTOxAJwZk3sST3ONFaexEPmH006hjb3bCS');
      const body = {
        product: selectedPlan,
        customer: customerInfo,
      };
  
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
      }
  };
  



  return (
    <div className="flex justify-center flex-wrap gap-4">
         <h1 className="text-brown-dark text-2xl font-semibold text-center">
      Choose  Plan
    </h1>
    {planData.map((plan) => (
  <div key={plan.id} className={`bg-white rounded-md p-4 w-full shadow-md`}>
    <label>
      <input
        type="radio"
        value={plan.id}
        checked={selectedPlan?.id === plan.id}
        onChange={() => handlePlanSelection(plan)}
      />
      <div className="text-lg font-semibold mb-2">{plan.name}</div>
      <div className="text-gray-600 mb-2">${plan.price }</div>
      <div className="text-gray-600">{plan.description}</div>
    </label>
  </div>
))}
      <button onClick={handlePayment}   className="bg-brown-dark w-[200px] text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center">Confirm Plan</button>
     
    </div>
  );
};

export default PlanSelectionForm;
