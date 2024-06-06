import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import BrownButton from '../../common/BrownButton';
import { removeCustomerInfo } from '../../../../redux/slices/userSlice/customerSlice';



const SuccessCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeCustomerInfo());
      navigate('/');
    }, 30000); //180000

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  }, [dispatch, navigate]);

  return (
    <div className='text-center'>
      <FaceSmileIcon color='green' />
      <p className='text-center mb-5'>Your AptusHR account has been successfully created.</p>
      <BrownButton px={100} py={8} value='Login' />
      <p className='mt-5'>Login details have been mailed to</p>
      <p className='font-medium'>ahmedrithas48@gmail.com</p>
    </div>
  );
};

export default SuccessCard;
