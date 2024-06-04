import {useState} from 'react'
import { sentOTP } from '../../../../api/user'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCustomerInfo } from '../../../../redux/slices/userSlice/customerSlice'



const RegsiterForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [name,setName] = useState('')
    const [mobile,setMobile] = useState('')
    const [domain,setDomain] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(e:any)=>{
      e.preventDefault();

      setIsLoading(true);

      const res = await sentOTP({email:email})

      setIsLoading(false);
      
      if(res?.data.success){
        dispatch(setCustomerInfo({name,mobile,domain,email,password}))
        navigate('/purchase/otp');  
      }
    }

  return (
    <>
    <h1 className="text-brown-dark text-2xl font-semibold text-center mb-4">
      Try AptusHR
    </h1>
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <div className="mb-7">
      <label
        htmlFor="name"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Name*
      </label>
      <input
        type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder="Type here"
        className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-brown-light focus:border-brown-light"
        
      />
    </div>
    <div className="mb-6">
      <label
        htmlFor="phoneNumber"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Phone Number*
      </label>
      <input
        type="tel"
        value={mobile}
        onChange={(e)=>setMobile(e.target.value)}
        placeholder="10 digit phone number"
        className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-brown-light focus:border-brown-light"
        
      />
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
        value={domain}
        onChange={(e)=>setDomain(e.target.value)}
        placeholder="[domainname].aptus.com"
        className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-brown-light focus:border-brown-light" 
      />
    </div>
    <div className="mb-6">
      <label
        htmlFor="emailAddress"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Email Address*
      </label>
      <input
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="example@example.com"
        className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-brown-light focus:border-brown-light"
        
      />
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
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="min 6 digits ******"
        className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-brown-light focus:border-brown-light"
        
      />
    </div>
    <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            style={isLoading ? { backgroundColor: '#7D6464' } : {}}
            className="bg-brown-dark w-[200px] text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center"
          >
            {isLoading && (
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            )}
            Sent OTP
          </button>
        </div>
    </form>
  </>
  )
}

export default RegsiterForm