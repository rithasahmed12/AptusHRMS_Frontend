import { useEffect, useState } from "react";
import {
  adminCustomers,
  blockCustomer,
  unblockCustomer,
} from "../../../api/admin";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Spinner from "../../Loader/Spinner";

interface Customer {
  _id: string;
  username: string;
  email: string;
  phone: number;
  company_name: string;
  plan: string;
  order_date: Date;
  expiry_date: Date;
  is_blocked: boolean;
  price: number;
}

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await adminCustomers();
      console.log(response);
      setCustomers(response?.data);
    } catch (error) {
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUnblock = async (customerId: string) => {
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to unblock this customer?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Unblock",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        setLoading(true);
        const response: any = await unblockCustomer(customerId);

        if (response.status === 200) {
          toast.success("Customer unblocked successfully");
          fetchRequests();
        }
      } catch (error) {
        toast.error("Failed to unblock customer");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBlock = async (customerId: string) => {
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to block this customer?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Block",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);

        const response: any = await blockCustomer(customerId);
        if (response.status === 200) {
          toast.success("customer blocked successfully");
          fetchRequests();
        }
      } catch (error) {
        toast.error("Failed to block customer");
      } finally {
        setLoading(true);
      }
    }
  };

  return (
    <div className="ml-64 p-1">
      <div className="bg-gray-100 p-6 rounded-sm shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Customers</h1>
        <div className="bg-white p-6 rounded-md mb-4">
          {loading ? (
            <Spinner color={"admin-orange"} />
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="bg-white text-gray-500">
                  <th className="py-2">No</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Phone</th>
                  <th className="py-2">Company</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Plan</th>
                  <th className="py-2">Order Date</th>
                  <th className="py-2">Expiry Date</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {customers.map((customer: Customer, index) => (
                  <tr
                    key={customer._id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{customer.username}</td>
                    <td className="py-2">{customer.email}</td>
                    <td className="py-2">{customer.phone}</td>
                    <td className="py-2">{customer.company_name}</td>
                    <td className="py-2">₹{customer.price}</td>
                    <td className="py-2">{customer.plan}</td>
                    <td className="py-2">
                      {new Date(customer.order_date).toLocaleDateString()}
                    </td>
                    <td className="py-2">
                      {new Date(customer.expiry_date).toLocaleDateString()}
                    </td>
                    <td className="py-2">
                      {!customer.is_blocked ? (
                        <p className="text-green-500 bg-green-100 bg-opacity-50 inline-block px-2 py-1 rounded-lg">
                          Active
                        </p>
                      ) : (
                        <p className="text-red-500 bg-red-100 bg-opacity-50 inline-block px-2 py-1 rounded-lg">
                          Blocked
                        </p>
                      )}
                    </td>
                    <td>
                      {customer.is_blocked ? (
                        <button
                          onClick={() => handleUnblock(customer._id)}
                          className="mr-2 border-2 border-green-600 px-2 hover:bg-gray-200 duration-300 text-green-600 rounded"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlock(customer._id)}
                          className="mr-2 border-2 border-red-600 px-4 hover:bg-gray-200 duration-300 text-red-600 rounded"
                        >
                          block
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
