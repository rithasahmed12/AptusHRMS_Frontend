type Props = {
    color:"white"|"brown",
    planName:string
    days:number
    employeeCount:number,
    price:number
}
const PlanContainer = ({ color, planName, days, employeeCount, price }: Props) => {
    return (
      <div className={`border w-full md:w-[300px] h-auto md:h-[770px] mx-2 md:mx-4 my-4 md:mb-4 overflow-hidden shadow-md flex flex-col items-center p-6 ${color === 'white' ? 'bg-white' : 'bg-snow-dark'}`}>
        <h1 className={`text-2xl font-semibold mb-2 ${color === 'brown' ? 'text-white' : ''}`}>{planName}</h1>
        <h1 className={`text-4xl font-bold mb-4 ${color === 'brown' ? 'text-white' : ''}`}>₹{price}</h1>
        <p className={`text-sm mb-4 ${color === 'brown' ? 'text-white' : ''}`}>For {days} days</p>
        <button className={
          `${
            color === 'brown' ? 'border-brown-dark bg-brown-dark text-white hover:bg-brown-light border-4 ' :
              'border-4 border-brown-light  hover:bg-gray-100 text-brown-dark'
          }
      font-bold py-3 px-6 mb-6 w-full`
        }>
          Start your plan
        </button>
        <hr className={`w-full border-t-2 ${color === 'brown' ? 'border-white' : 'border-gray-200'} mb-4`} />
        <ul className="mt-3">
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Upto {employeeCount} Employees</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Attendance Management</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Payroll Management</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Leave Management</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Goal Setting, Tracking</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Credit Facilities</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Savings Scheme</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Recruitment Facilities</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Provide Training Support</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Set Group Meetings</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Monitor Performance</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Employee Enquiry Chatbox</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Easy Reports Generator</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Letter Generator</li>
          <li className={`mb-2 ${color === 'brown' ? 'text-white font-medium' : ''}`}>Employee Self Onboarding</li>
        </ul>
      </div>
    );
  };
  
  export default PlanContainer;
  

  
  