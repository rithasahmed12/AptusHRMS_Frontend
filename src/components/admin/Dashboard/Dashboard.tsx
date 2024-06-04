import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="ml-64 p-1">
      <div className="bg-gray-100 p-6 rounded-sm shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Overview</h1>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-white rounded-md">
            <h2 className="text-xl font-semibold">₹21,000</h2>
            <p>Total Income</p>
          </div>
          <div className="p-4 bg-white rounded-md">
            <h2 className="text-xl font-semibold">₹5,000</h2>
            <p>Total Expense</p>
          </div>
          <div className="p-4 bg-white rounded-md">
            <h2 className="text-xl font-semibold">₹21,000</h2>
            <p>Total Income</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-md mb-4">
          <h2 className="text-xl font-medium mb-4">Sales Report</h2>
          <div className="h-64">
            {/* chart component here */}
          </div>
        </div>
        <div className="bg-white p-6 rounded-md mb-4">
          <h2 className="text-xl font-medium mb-4">Transaction History</h2>
          <table className="min-w-full bg-gray-100">
            <thead>
              <tr className='bg-white text-gray-500'>
                <th className="py-2">No</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Date</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Order No.</th>
                <th className="py-2">Payment type</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              <tr>
                <td className="py-2">1</td>
                <td className="py-2">Ackerman</td>
                <td className="py-2">12.03.2023</td>
                <td className="py-2">₹2999</td>
                <td className="py-2">#21033</td>
                <td className="py-2">Visa Card</td>
              </tr>
              <tr className='bg-white'>
                <td className="py-2">2</td>
                <td className="py-2">Levi</td>
                <td className="py-2">12.03.2023</td>
                <td className="py-2">₹4999</td>
                <td className="py-2">#21034</td>
                <td className="py-2">Master Card</td>
              </tr>
              <tr>
                <td className="py-2">3</td>
                <td className="py-2">Eren</td>
                <td className="py-2">12.03.2023</td>
                <td className="py-2">₹2999</td>
                <td className="py-2">#21035</td>
                <td className="py-2">Visa Card</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="fixed bottom-0 right-0 m-4">
        <button className="bg-orange-500 text-white py-2 px-4 rounded shadow-lg">Filter</button>
        <button className="bg-orange-500 text-white py-2 px-4 rounded shadow-lg ml-2">Download Sales Report</button>
      </div> */}
    </div>
  );
}

export default Dashboard;
