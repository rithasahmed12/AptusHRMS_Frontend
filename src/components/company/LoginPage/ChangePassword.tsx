import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon  } from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
// import { requestOtp, verifyOtp, changePassword } from "../../../api/company";
import { setCompanyInfo } from "../../../redux/slices/companySlice/companySlice";
import { changePassword, sentOTP, verifyOTP } from "../../../api/company";
import { message } from "antd";
import { setVerifyEmail } from "../../../redux/slices/companySlice/emailSlice";
import { RootState } from "@reduxjs/toolkit/query";



interface EmailInputProps {
  onNext: (email: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ onNext }) => {
  const [email, setEmail] = useState<string>('');
    const dispatch = useDispatch()
  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    console.log('email:',email);
    
      const res = await sentOTP(email);
      dispatch(setVerifyEmail(email));
      message.success(res.data.message);
      onNext(email);
    } catch (error) {
      message.error("Failed to request OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto">
      <h2 className="mb-4 text-xl font-semibold text-center">Email Verification</h2>
      <form onSubmit={handleNext} className="w-full px-4">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email*</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="example@example.com"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-2">
          <button type="submit" className="w-full py-2 bg-black text-white rounded-full hover:bg-gray-700 transform duration-500">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

  
  interface OtpVerificationProps {
    email: string;
    onNext: () => void;
    onBack: () => void;
  }
  
  const OtpVerification: React.FC<OtpVerificationProps> = ({ onNext, onBack }) => {
    const email = useSelector((state: any) => state.email.email);
    const [timer, setTimer] = useState(60);
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [otpSent, setOtpSent] = useState(false);
    const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  
    useEffect(() => {
        const interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
    
        if (timer === 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [timer]);

    const handleChange = (index: number, value: string) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
  
      if (value && index < 3 && inputRefs[index + 1].current) {
        inputRefs[index + 1].current?.focus();
      }
    };
  
    const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const otpString = otp.join('');
          const res:any = await verifyOTP({email, otpString});
          console.log('res:',res);
          if (res.data.success) {
            message.success(res.data.message);
            onNext();
          } else {
            message.error(res.data.message);
          }
        } catch (error) {
          message.error("Failed to verify OTP");
        }
      };

      const handleResendOTP = async() => {
        try {
          const res = await sentOTP(email);
          if (res.data.success) {
            setTimer(60); 
            setOtpSent(true);
            message.success(res.data.message);
          } else {
            message.error(res.data.message);
          }
        } catch (error) {
          message.error("Failed to resend OTP");
        }
      };
  
    return (
      <div className="flex flex-col justify-center gap-2 items-center">
        <div className="w-full flex items-center mb-4">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold text-center flex-grow">OTP Verification</h2>
        </div>
        <form onSubmit={handleNext} className="w-full px-4">
          <div className="mb-4 flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-center border border-gray-300 rounded"
              />
            ))}
          </div>
          <div className="flex justify-center mb-4">
          {timer === 0 ? (
            <button type="button" onClick={handleResendOTP} className="text-brown-dark hover:text-brown-dark/80">
              Resend OTP
            </button>
          ) : (
            <span>{`Resend OTP in ${timer} seconds`}</span>
          )}
        </div>
          <div className="mb-2">
            <button type="submit" className="w-full py-2 bg-black text-white rounded-full hover:bg-gray-700 transform duration-500">
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    );
  };
  

  interface ChangePasswordProps {
    email: string;
    onBack: () => void;
  }
  
  const ChangePassword: React.FC<ChangePasswordProps> = ({ email, onBack }) => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        message.error("Passwords do not match");
        return;
      }
      try {
        const response = await changePassword({email,newPassword:password});
        console.log('response:',response);
        // return;
        message.success('Password successfully changed!');
        navigate('/c/dashboard');
      } catch (error) {
        message.error("Failed to change password");
      }
    };
  
    return (
      <div className="flex flex-col w-full items-center">
        <div className="w-full flex items-center mb-4">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        </div>
        <h2 className="mb-4 text-xl font-semibold text-center">Change Password</h2>
        <form onSubmit={handleChangePassword} className="w-full px-4">
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-1">New Password*</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="****** min 6 digit"
              className="w-full p-2 border border-gray-300 rounded"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-8 right-2 flex items-center"
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1">Confirm New Password*</label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              placeholder="****** min 6 digit"
              className="w-full p-2 border border-gray-300 rounded"
              required
              minLength={6}
            />
          </div>
          <div className="mb-2">
            <button type="submit" className="w-full py-2 bg-black text-white rounded-full hover:bg-gray-700 transform duration-500">
              Change Password
            </button>
          </div>
        </form>
      </div>
    );
  };
  


  const ChangePasswordPage = () => {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
  
    const handleNext = (email:string) => {
      setEmail(email);
      setStep(step + 1);
    };
  
    const handleBack = () => {
      setStep(step - 1);
    };
  
    return (
      <div className="flex justify-center min-h-screen bg-[#f0f0f0] overflow-hidden">
        <div className="absolute left-0 hidden md:flex flex-col justify-center h-svh w-[300px] bg-black text-white text-center">
          <h1 className="font-extrabold text-xl mb-2">Welcome To AptusHR</h1>
          <p>Streamline. Save Time. Better Clime</p>
        </div>
        <div className={`flex justify-center items-center w-full md:w-auto`}>
          <div className="h-[400px] w-[400px] bg-white shadow-lg rounded-lg flex flex-col justify-center items-center p-6">
            {step === 0 && <EmailInput onNext={handleNext} />}
            {step === 1 && <OtpVerification email={email} onNext={() => setStep(2)} onBack={handleBack} />}
            {step === 2 && <ChangePassword email={email} onBack={handleBack} />}
          </div>
        </div>
      </div>
    );
  };

export default ChangePasswordPage;
