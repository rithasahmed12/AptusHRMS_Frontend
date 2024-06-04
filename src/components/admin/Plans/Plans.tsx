import { useState } from "react";
import AddPlansModal from "./utils/AddPlansModal";

const Plans = () => {
    const [isAddPlansModal, setIsAddPlansModal] = useState(false);

    const handleAddPlan = () => {
        setIsAddPlansModal(true);
    }

    const handleCloseModal = () => {
        setIsAddPlansModal(false);
    };
    
  return (
    <>
    <div className="ml-64 p-1">
      <div className="bg-gray-100 p-6 rounded-sm shadow-lg">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">Plans</h1>
          <div className="flex justify-end">
          <button
          onClick={handleAddPlan}
      className="bg-admin-orange hover:bg-orange-500 duration-300 text-white py-2 px-10 rounded-full"
      
    >
      Create Plan
    </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-md mb-4">
          <table className="min-w-full">
            <thead>
              <tr className="bg-white text-gray-500">
                <th className="py-2">No</th>
                <th className="py-2">Name</th>
                <th className="py-2">Duration</th>
                <th className="py-2">Price</th>
                <th className="py-2">Employees Alloted</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace with actual data fetching logic (currently static) */}
              <tr className="text-center bg-gray-100">
                <td className="py-2">1</td>
                <td className="py-2">Basic Plan</td>
                <td className="py-2">1 Month</td>
                <td className="py-2">₹2999</td>
                <td className="py-2">10</td>
                <td className="py-2">
                  <p className="text-green-500 bg-green-100 bg-opacity-50 inline-block px-2 py-1 rounded-lg">
                    Active
                  </p>
                </td>
                <td className="py-2 flex justify-center gap-3">
                  <button className="border-2 border-admin-orange px-4 hover:bg-gray-200 duration-300 text-admin-orange rounded">
                    Edit
                  </button>
                  <button
                       className="mr-2 border-2 border-green-600 px-2 hover:bg-gray-200 duration-300 text-green-600 rounded">
                        Unblock
                      </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {isAddPlansModal && (
        <AddPlansModal
          isOpen={isAddPlansModal}
          onClose={handleCloseModal}
        />
      )}
      </>
  );
};

export default Plans;
