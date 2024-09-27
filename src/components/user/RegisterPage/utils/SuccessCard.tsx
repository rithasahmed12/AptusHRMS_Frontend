import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import BrownButton from '../../common/BrownButton';
import { removeCustomerInfo } from '../../../../redux/slices/userSlice/customerSlice';



const SuccessCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customerInfo } = useSelector((state: any) => state.customerInfo);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeCustomerInfo());
      navigate('/');
    }, 30000); 

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className='text-center'>
      <FaceSmileIcon color='green' />
      <p className='text-center mb-5'>Your AptusHR account has been successfully created.</p>
      <Link to={customerInfo.url}>
      <BrownButton px={100} py={8} value='Login' />
      </Link> 
      <p className='mt-5'>Login details have been mailed to</p>
      <p className='font-medium'>{customerInfo.email}</p>
    </div>
  );
};

export default SuccessCard;
