import { useEffect, useState } from "react";
import AddPlansModal from "./utils/AddPlansModal";
import EditPlansModal from "./utils/EditPlansModal";
import { toast } from "react-toastify";
import { getPlan, listPlan, unlistPlan } from "../../../api/admin";
import Swal from "sweetalert2";
import DropdownMenu from "./utils/DropdownMenu";

const Plans = () => {
    const [isAddPlansModal, setIsAddPlansModal] = useState(false);
    const [isEditPlansModal, setIsEditPlansModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [plans, setPlans] = useState([]);
    const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

    const handleAddPlan = () => {
        setIsAddPlansModal(true);
    }

    const handleCloseAddModal = () => {
        setIsAddPlansModal(false);
    };

    const handleCloseEditModal = () => {
        setIsEditPlansModal(false);
        setSelectedPlan(null);
    };

    const fetchPlans = async () => {
        try {
            const response = await getPlan();
            console.log(response?.data);
            setPlans(response?.data);
        } catch (error) {
            toast.error('Error Fetching Data');
        }
    }

    useEffect(() => {
        fetchPlans()
    }, [isAddPlansModal, isEditPlansModal])

    const handleListPlan = async (planId: string) => {
        const result = await Swal.fire({
            title: "Confirmation",
            text: "Are you sure you want to list this plan?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Approve",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                const response: any = await listPlan(planId);

                if (response.status === 200) {
                    toast.success("Plan listed successfully!");
                    fetchPlans();
                }

            } catch (error) {
                toast.error("Failed to list the plan");
            }
        }
    };

    const handleUnlistPlan = async (planId: string) => {
        const result = await Swal.fire({
            title: "Confirmation",
            text: "Are you sure you want to unlist this plan?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Approve",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                const response: any = await unlistPlan(planId);
                if (response.status === 200) {
                    toast.success("Plan unlisted successfully!");
                    fetchPlans();
                }
            } catch (error) {
                toast.error("Failed to unlist the plan!");
            }
        }
    };

    const handleEditPlan = (plan: any) => {
        setSelectedPlan(plan);
        setIsEditPlansModal(true);
    };

    const handleDeletePlan = (planId: string) => {
        // Handle delete plan logic
        console.log(`Delete plan: ${planId}`);
    };

    const toggleDropdown = (index: number) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
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
                            <tbody className="text-center relative">
                                {plans.map((plan: any, index) => (
                                    <tr
                                        key={plan._id}
                                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                                    >
                                        <td className="py-2">{index + 1}</td>
                                        <td className="py-2">{plan.plan_name}</td>
                                        <td className="py-2">{plan.duration} days</td>
                                        <td className="py-2">₹{plan.plan_price}</td>
                                        <td className="py-2">{plan.max_employees} employees</td>
                                        <td className="py-2">
                                            {plan.is_listed ? (
                                                <p className="text-green-500 bg-green-100 bg-opacity-50 inline-block px-2 py-1 rounded-lg">
                                                    Active
                                                </p>
                                            ) : (
                                                <p className="text-red-500 bg-red-100 bg-opacity-50 inline-block px-2 py-1 rounded-lg">
                                                    Blocked
                                                </p>
                                            )}
                                        </td>
                                        <td className="relative">
                                            {!plan.is_listed ? (
                                                <button
                                                    onClick={() => handleListPlan(plan._id)}
                                                    className="mr-2 border-2 border-green-600 px-6 hover:bg-gray-200 duration-300 text-green-600 rounded">
                                                    List
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleUnlistPlan(plan._id)}
                                                    className="mr-2 border-2 border-red-600 px-4 hover:bg-gray-200 duration-300 text-red-600 rounded">
                                                    Unlist
                                                </button>
                                            )}
                                            <button
                                                onClick={() => toggleDropdown(index)}
                                                className="ml-2 text-gray-500 hover:text-gray-700 font-extrabold">
                                                &#x22EE;
                                            </button>
                                            {dropdownIndex === index && (
                                                <DropdownMenu
                                                    onEdit={() => handleEditPlan(plan)}
                                                    onDelete={() => handleDeletePlan(plan._id)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isAddPlansModal && (
                <AddPlansModal
                    isOpen={isAddPlansModal}
                    onClose={handleCloseAddModal}
                />
            )}
            {isEditPlansModal && selectedPlan && (
                <EditPlansModal
                    isOpen={isEditPlansModal}
                    onClose={handleCloseEditModal}
                    plan={selectedPlan}
                />
            )}
        </>
    );
};

export default Plans;
