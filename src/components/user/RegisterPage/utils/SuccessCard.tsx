import { FaceSmileIcon } from '@heroicons/react/24/outline'
import BrownButton from '../../common/BrownButton'
// import { useSelector } from 'react-redux'



const SuccessCard = () => {

  // const {customerInfo} = useSelector((state:any)=> state.customerInfo)
  return (
    <>  
    <div className='text-center' >
        <FaceSmileIcon color='green'/>
        <p className='text-center mb-5'>Your AptusHR account has been succesfully Created.</p>
        <BrownButton px={100} py={8} value='Login' />
        <p className='mt-5'>Login details have been mailed to</p>
        <p className='font-medium'>ahmedrithas48@gmail.com</p>
    </div>
        
        
    </>
  )
}

export default SuccessCard