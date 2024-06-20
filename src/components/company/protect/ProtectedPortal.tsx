import { useState, useEffect } from "react";
import { verifyTenant } from "../../../api/company";
import { toast } from "react-toastify";

const ProtectedPortal = ({ children }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portalId, setPortalId] = useState("");

  useEffect(() => {
    const storedPortalId = localStorage.getItem("portalId");
    if (!storedPortalId) {
      setIsModalOpen(true);
    }
  }, []);

  const handlePortalIdChange = (event: any) => {
    setPortalId(event.target.value);
  };

  const handleSubmit = async () => {
    if (portalId.trim() !== "") {
      try {
        const url = new URL(window.location.href);
        const hostname = url.hostname;
        const domain = hostname.includes('.') ? hostname.split('.')[0] : null;
        const response = await verifyTenant(portalId, domain);
        console.log('response:',response);
    
        if(response.status === 201){
          localStorage.setItem("portalId", response.data);
          toast.success("Portal Verified Successfully!");
          setIsModalOpen(false);
        }else if(response.status === 401){ 
          toast.error(response?.data.message);
        }
    
      } catch (error) {
        toast.error('Verification failed. Please check your Portal ID and try again.');
      }
    }
  };

  if (isModalOpen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start  justify-center z-50">
        <div className="bg-white text-black p-6 rounded-lg shadow-lg relative top-10 w-[270px] animate-slideDown">
          <h2 className="text-xl text-center font-bold mb-4">Enter Portal ID</h2>
          <input
            type="text"
            value={portalId}
            onChange={handlePortalIdChange}
            placeholder="Enter Portal ID"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedPortal;