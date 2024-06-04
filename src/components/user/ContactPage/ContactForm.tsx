import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_mobile: "",
    user_email: "",
    company_name: "",
    employee_count: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "message" || name === "company_name") {
      setFormData({
        ...formData,
        [name]: value
      });
    } else if (name === "user_mobile" || name === "employee_count") {
      if (/^\d*$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value.trim()
      });
    }
  };
  
  

  const sendEmail = (e: any) => {
    e.preventDefault();

    const validationError = validateFormData(formData);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    // Send email if validation passes
    emailjs
      .sendForm("service_xe5a4a7", "template_cwn8o7q", e.target, {
        publicKey: "8IQ1UwCcv2gDxBLMe",
      })
      .then(() => {
        toast.success("Enquiry has been sent, We will reply you shortly!",{
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setFormData({
          first_name: "",
          last_name: "",
          user_mobile: "",
          user_email: "",
          company_name: "",
          employee_count: "",
          message: "",
        });
      })
      .catch((error) => {
        toast.error("Failed!", error.text);
      });
  };

  return (
    <form onSubmit={sendEmail}>
      <div className="bg-snow p-8 rounded-lg shadow-lg">
        <div className="mb-4 flex">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="flex-1 w-full p-2 border border-gray-300 rounded-md mr-2"
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="flex-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 flex">
          <input
            type="tel"
            name="user_mobile"
            value={formData.user_mobile}
            onChange={handleChange}
            placeholder="Phone"
            className="flex-1 w-full p-2 border border-gray-300 rounded-md mr-2"
          />
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            placeholder="Email"
            className="flex-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 flex">
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Company Name"
            className="flex-1 w-full p-2 border border-gray-300 rounded-md mr-2"
          />
          <input
            type="text"
            name="employee_count"
            value={formData.employee_count}
            onChange={handleChange}
            placeholder="Employee Count"
            className="flex-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-brown-dark w-[200px] text-white font-semibold py-2 px-4 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

const validateFormData = (formData: any) => {
  if (!formData.first_name) {
    return "First name is required.";
  }

  if (!formData.last_name) {
    return "Last name is required.";
  }

  if (!formData.user_mobile) {
    return "Phone number is required.";
  }

  if (
    isNaN(Number(formData.user_mobile)) ||
    formData.user_mobile.trim().length !== 10
  ) {
    return "Mobile number must be a 10-digit number.";
  }

  if (!formData.user_email.match(/^\S+@\S+\.\S+$/)) {
    return "Invalid email format.";
  }

  if (!formData.company_name) {
    return "Company name is required.";
  }

  if (!formData.employee_count) {
    return "Employee count is required.";
  }

  if (isNaN(Number(formData.employee_count))) {
    return "Employee count must be a number.";
  }

  if (!formData.message) {
    return "Message is required.";
  }

  if (formData.message.trim().split(/\s+/).length < 5) {
    return "Message must contain at least 10 words.";
  }

  return null;
};

export default ContactForm;
