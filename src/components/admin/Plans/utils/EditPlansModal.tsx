import { useEffect, useState } from "react";
// import { updatePlan } from "../../../../api/admin"; // Make sure to create this function in your api calls
import { toast } from "react-toastify";
import { editPlan } from "../../../../api/admin";

const EditPlansModal = ({
  isOpen,
  onClose,
  plan,
}: {
  isOpen: boolean;
  onClose: () => void;
  plan: any;
}) => {
  const [planName, setPlanName] = useState("");
  const [planAmount, setPlanAmount] = useState("");
  const [planDuration, setPlanDuration] = useState("");
  const [maxEmployees, setMaxEmployees] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (plan) {
      setPlanName(plan.plan_name);
      setPlanAmount(plan.plan_price.toString());
      setPlanDuration(plan.duration.toString());
      setMaxEmployees(plan.max_employees.toString());
    }
  }, [plan]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const body = {
      planName,
      planAmount: planAmount,
      planDuration: planDuration,
      maxEmployees: maxEmployees,
    };

    try {
      setIsLoading(true);
      const response: any = await editPlan(plan._id, body);
      console.log("response:", response);

      if (response?.status === 200) {
        toast.success("Plan updated Successfully");
        onClose();
      } else {
        toast.error("Plan name already exists!");
      }
    } catch (error: any) {
      console.log("error:", error);

      if (error.response && error.response.status === 409) {
        // Conflict error
        toast.error(error.response.data.message);
      } else {
        // Other errors
        toast.error("Something went wrong");
      }
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}
    >
      <form>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start mt-2">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-8 text-center">
                    Edit Plan
                  </h3>
                  <div className="mb-4 flex flex-wrap justify-between gap-4">
                    <div className="w-48">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Plan Name
                      </label>
                      <input
                        type="text"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        className="mt-1 mb-2 ps-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="w-48">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Pricing(₹)
                      </label>
                      <input
                        type="text"
                        value={planAmount}
                        onChange={(e) => setPlanAmount(e.target.value)}
                        className="mt-1 mb-2 ps-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex flex-wrap justify-between">
                    <div className="w-48">
                      <label
                        htmlFor="duration"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Duration(in days)
                      </label>
                      <input
                        type="text"
                        value={planDuration}
                        onChange={(e) => setPlanDuration(e.target.value)}
                        className="mt-1 mb-2 ps-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="w-48">
                      <label
                        htmlFor="employees"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Max Employees
                      </label>
                      <input
                        type="text"
                        value={maxEmployees}
                        onChange={(e) => setMaxEmployees(e.target.value)}
                        className="mt-1 mb-2 ps-1 block w-full h-8 shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="submit" disabled={isLoading} onClick={handleSubmit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-admin-orange text-base font-medium text-white hover:bg-orange-500 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm">
                {isLoading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    <span className="ml-2">Saving...</span>
                  </>
                ) : (
                  "Save"
                )}
                </button>
              <button
                onClick={onClose}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-admin-orange sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPlansModal;
