import { useState } from "react";
import { sentOTP } from "../../../../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCustomerInfo } from "../../../../redux/slices/userSlice/customerSlice";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    domain: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({
    name: "",
    mobile: "",
    domain: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "domain") {
      processedValue = value.replace(/\s/g, "").toLowerCase();
    }

    if (name === "mobile") {
      processedValue = value.replace(/\D/g, "");
    }

    if (name === "name") {
      processedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    setFormData({
      ...formData,
      [name]: processedValue,
    });

    validateField(name, processedValue);
  };

  const validateField = (name: string, value: string) => {
    let error: string | undefined = undefined;

    if (name === "name") {
      if (!value.trim()) {
        error = "Name is required.";
      } else if (/\d/.test(value)) {
        error = "Name cannot contain numbers.";
      }
    }

    if (name === "mobile") {
      if (!value.trim()) {
        error = "Phone number is required.";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Phone number must be a 10-digit number.";
      }
    }

    if (name === "domain") {
      if (!value.trim()) {
        error = "Domain name is required.";
      } else if (/\s/.test(value)) {
        error = "Domain name cannot contain spaces.";
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        error = "Invalid email format.";
      }
    }

    if (name === "password") {
      if (!value.trim()) {
        error = "Password is required.";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters.";
      }
    }

    console.log("reached here:", errors);

    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateFormData = () => {
    const { name, mobile, domain, email, password } = formData;

    // Validate all fields
    validateField("name", name);
    validateField("mobile", mobile);
    validateField("domain", domain);
    validateField("email", email);
    validateField("password", password);

    console.log(Object.values(errors));
    // Check if there are any errors

    if (Object.values(errors).every((error) => error === "")) {
      return false;
    } else if (Object.values(errors).some((error) => error)) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form data first
    const isValid = validateFormData();

    // If there are errors, don't proceed with the backend request
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    const res = await sentOTP({ email: formData.email });

    setIsLoading(false);

    if (res?.data.success) {
      dispatch(setCustomerInfo({ ...formData, success: false }));
      navigate("/purchase/otp");
    }
  };

  return (
    <>
      <h1 className="text-brown-dark text-2xl font-semibold text-center mb-4">
        Try AptusHR
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-7">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name*
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Type here"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-brown-light focus:border-brown-light"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number*
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="10 digit phone number"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-brown-light focus:border-brown-light"
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="domain"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Domain Name*
          </label>
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            placeholder="[domainname].aptus.com"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-brown-light focus:border-brown-light"
          />
          {errors.domain && (
            <p className="text-red-500 text-xs mt-1">{errors.domain}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address*
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@example.com"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-brown-light focus:border-brown-light"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password*
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="min 6 digits ******"
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-brown-light focus:border-brown-light"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            style={isLoading ? { backgroundColor: "#7D6464" } : {}}
            className="bg-brown-dark w-[200px] text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center"
          >
            {isLoading && (
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            )}
            Send OTP
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
