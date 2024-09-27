import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { verifyOTP,sentOTP } from '../../../../api/user';
import { toast } from 'react-toastify';

const OTPForm = () => {
  const { customerInfo } = useSelector((state: any) => state.customerInfo);

  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
  
      if (value && index < 3) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
        nextInput.focus();
      }
    }
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);

    const res = await verifyOTP({otp:Number(enteredOtp),email:customerInfo.email})
    console.log(res)

    setIsLoading(false);

    if(res?.data.success){
    navigate('/purchase/plan');
    }else{
      toast.error(res?.data.message)
    }
  };

  const handleResendOTP = async() => {
    const res = await sentOTP({email:customerInfo.email})
    setTimer(60); 
    setOtpSent(true);
    setOtp(otp.fill(''));
    if(res?.data.success){
      toast.success(res.data.message)
    }else{
      toast.error(res?.data.message)
    }
  
  };

  return (
    <>
      <h1 className="text-brown-dark text-2xl font-semibold text-center mb-4">Enter OTP</h1>
      {otpSent && <p className="text-gray-500 text-center mb-4">OTP has been sent to your email</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              data-index={index}
              className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-10 h-10 mx-2 text-center focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
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
        <div className="flex justify-center space-x-4">
          <button 
          type="submit"
          disabled={isLoading}
          style={isLoading ? { backgroundColor: '#7D6464' } : {}}
           className="bg-brown-dark w-[200px] text-white font-semibold py-2 px-4 rounded-md">
             {isLoading && (
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            )}
            Verify
          </button>
        </div>
      </form>
    </>
  );
};

export default OTPForm;
