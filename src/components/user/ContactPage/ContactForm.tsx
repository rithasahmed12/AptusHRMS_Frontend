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

  const [errors, setErrors] = useState({
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
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    
    if (name === "first_name" && !value) {
      error = "First name is required.";
    }

    if (name === "last_name" && !value) {
      error = "Last name is required.";
    }

    if (name === "user_mobile") {
      if (!value) {
        error = "Phone number is required.";
      } else if (isNaN(Number(value)) || value.trim().length !== 10) {
        error = "Mobile number must be a 10-digit number.";
      }
    }

    if (name === "user_email") {
      if (!value) {
        error = "Email is required.";
      } else if (!value.match(/^\S+@\S+\.\S+$/)) {
        error = "Invalid email format.";
      }
    }

    if (name === "company_name" && !value) {
      error = "Company name is required.";
    }

    if (name === "employee_count") {
      if (!value) {
        error = "Employee count is required.";
      } else if (isNaN(Number(value))) {
        error = "Employee count must be a number.";
      }
    }

    if (name === "message") {
      if (!value) {
        error = "Message is required.";
      } else if (value.trim().split(/\s+/).length < 5) {
        error = "Message must contain at least 5 words.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateFormData = (formData: any) => {
    let newErrors:any = { 
      first_name: "", 
      last_name: "", 
      user_mobile: "", 
      user_email: "", 
      company_name: "", 
      employee_count: "", 
      message: "" 
    };

    if (!formData.first_name) {
      newErrors.first_name = "First name is required.";
    }

    if (!formData.last_name) {
      newErrors.last_name = "Last name is required.";
    }

    if (!formData.user_mobile) {
      newErrors.user_mobile = "Phone number is required.";
    } else if (isNaN(Number(formData.user_mobile)) || formData.user_mobile.trim().length !== 10) {
      newErrors.user_mobile = "Mobile number must be a 10-digit number.";
    }

    if (!formData.user_email) {
      newErrors.user_email = "Email is required.";
    } else if (!formData.user_email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.user_email = "Invalid email format.";
    }

    if (!formData.company_name) {
      newErrors.company_name = "Company name is required.";
    }

    if (!formData.employee_count) {
      newErrors.employee_count = "Employee count is required.";
    } else if (isNaN(Number(formData.employee_count))) {
      newErrors.employee_count = "Employee count must be a number.";
    }

    if (!formData.message) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().split(/\s+/).length < 5) {
      newErrors.message = "Message must contain at least 5 words.";
    }

    setErrors(newErrors);

    for (let key in newErrors) {
      if (newErrors[key]) return false;
    }

    return true;
  };

  const sendEmail = (e: any) => {
    e.preventDefault();

    if (!validateFormData(formData)) {
      return;
    }

    // Send email if validation passes
    emailjs
      .sendForm("service_xe5a4a7", "template_cwn8o7q", e.target, {
        publicKey: "8IQ1UwCcv2gDxBLMe",
      })
      .then(() => {
        toast.success("Enquiry has been sent, We will reply you shortly!", {
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
        setErrors({
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
          <div className="flex-1 mr-2">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="flex-1 mr-2">
            <input
              type="tel"
              name="user_mobile"
              value={formData.user_mobile}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.user_mobile && <p className="text-red-500 text-sm mt-1">{errors.user_mobile}</p>}
          </div>
          <div className="flex-1">
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.user_email && <p className="text-red-500 text-sm mt-1">{errors.user_email}</p>}
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="flex-1 mr-2">
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>}
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="employee_count"
              value={formData.employee_count}
              onChange={handleChange}
              placeholder="Employee Count"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.employee_count && <p className="text-red-500 text-sm mt-1">{errors.employee_count}</p>}
          </div>
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
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
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

export default ContactForm;
