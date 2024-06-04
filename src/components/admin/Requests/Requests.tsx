import { useEffect, useState } from "react";
import { adminRequests, approveRequest, declineRequest } from "../../../api/admin";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface Request {
  _id: string;
  username: string;
  email: string;
  phone: number;
  company_name: string;
  plan: string;
  order_date: Date;
  is_approved: boolean;
  service_status:string
  price:number
}

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await adminRequests();
      console.log(response);
      setRequests(response?.data);
    } catch (error) {
      toast.error("Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (requestId: string) => {
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to approve this request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response:any = await approveRequest(requestId);
        
        if(response.status === 200){
          toast.success("Request approved successfully");
          fetchRequests();
        }
        
      } catch (error) {
        toast.error("Failed to approve request");
      }
    }
  };

  const handleDecline = async (requestId: string) => {
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to decline this request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Decline",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response:any = await declineRequest(requestId);
        if(response.status === 200){
          toast.success("Request declined successfully");
          fetchRequests();
        }
      } catch (error) {
        toast.error("Failed to decline request");
      }
    }
  };

  return (
    <div className="ml-64 p-1">
      <div className="bg-gray-100 p-6 rounded-sm shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Requests</h1>
        <div className="bg-white p-6 rounded-md mb-4">
          <table className="min-w-full">
            <thead>
              <tr className="bg-white text-gray-500">
                <th className="py-2">No</th>
                <th className="py-2">Username</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Company</th>
                <th className="py-2">Plan</th>
                <th className="py-2">Order Date</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {requests.map((request: Request, index) => (
                <tr
                  key={request._id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{request.username}</td>
                  <td className="py-2">{request.email}</td>
                  <td className="py-2">{request.phone}</td>
                  <td className="py-2">{request.company_name}</td>
                  <td className="py-2">{request.plan}</td>
                  <td className="py-2">
                    {new Date(request.order_date).toLocaleDateString()}
                  </td>
                  <td className="py-2">₹{request.price}</td>
                  <td className="py-2">
                    {request.service_status === "Approved" ? (
                      <p className="text-green-500 bg-green-100 bg-opacity-50 inline-block px-2 py-1 rounded-lg">
                        Approved
                      </p>
                    ) : request.service_status === "Pending" ? (
                      <p className="text-yellow-500 bg-yellow-100 bg-opacity-50 inline-block px-2 py-1 rounded-lg">
                        Pending
                      </p>
                    ) : request.service_status === "Declined" ? (
                      <p className="text-red-500 bg-red-100 bg-opacity-50 inline-block px-2 py-1 rounded-lg">
                        Declined
                      </p>
                    ) : null}
                  </td>
                  <td className="py-2">
                   { (request.service_status === "Pending") ? (
                    <>
                     <button
                     onClick={() => handleApprove(request._id)}
                     className="mr-2 border-2 border-green-600 px-2 hover:bg-gray-200 duration-300 text-green-600 rounded"
                   >
                     Approve
                   </button>
                   <button
                     onClick={() => handleDecline(request._id)}
                     className="border-2 border-red-600 px-3 hover:bg-gray-200 duration-300 text-red-600 rounded"
                   >
                     Decline
                   </button>
                   </>
                   ) : (
                    <span>-</span>
                   )
                   } 
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Requests;
