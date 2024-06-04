const Footer = () => {
    return (
      <footer className="bg-brown-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="mt-14 mb-14 flex flex-col md:flex-row justify-around items-start">
            {/* APTUS Details */}
            <div className='mb-6 md:mb-0'> {/* Conditionally apply ms-20 class */}
              <h1 className="text-3xl font-bold">APTUS</h1>
              <p className="text-sm mt-2">Your Complete HRMS solution</p>
            </div>
            {/* Quick Links */}
            <div className="mb-6 md:mb-0 md:ml-0 md:mt-6">
              <h3 className="text-lg font-bold mb-2">Quick Links</h3>
              <ul>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-400">
                    About Us
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-400">
                    Plans
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#" className="hover:text-gray-400">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            {/* Our Contacts */}
            <div className="md:mt-6">
              <h2 className="text-xl font-bold mb-2">Our Contacts</h2>
              <p className="text-sm">123 Street Name</p>
              <p className="text-sm">City, Country</p>
              <p className="text-sm">Phone: +1234567890</p>
              <p className="text-sm">Email: info@example.com</p>
            </div>
          </div>
        </div>
        <p className="text-center">All rights reserved © Copyright by Rithas Ahmed</p>
      </footer>
    );
  };
  
  export default Footer;
  