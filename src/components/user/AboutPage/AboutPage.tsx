import { Link } from 'react-router-dom';
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import BrownButton from "../common/BrownButton";
import WhiteButton from "../common/WhiteButton";
import { UserGroupIcon, LightBulbIcon, ChartBarIcon } from '@heroicons/react/24/solid';

const AboutPage = () => {
  return (
    <>
      <NavBar />
      <div className="bg-snow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-brown-dark text-center mb-8">About Aptus HRMS</h1>
          <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
            At Aptus HRMS, we're revolutionizing the way businesses manage their human resources. Our comprehensive HRMS solution is designed to simplify and optimize every aspect of HR management, from onboarding to offboarding and everything in between.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <UserGroupIcon className="h-12 w-12 text-brown-dark mb-4 mx-auto" />
              <h2 className="text-xl font-semibold text-center mb-2">Our Mission</h2>
              <p className="text-center">To empower organizations with intuitive HR tools that foster growth, efficiency, and employee satisfaction.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <LightBulbIcon className="h-12 w-12 text-brown-dark mb-4 mx-auto" />
              <h2 className="text-xl font-semibold text-center mb-2">Our Vision</h2>
              <p className="text-center">To be the leading HRMS provider, driving innovation in human resource management across industries.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ChartBarIcon className="h-12 w-12 text-brown-dark mb-4 mx-auto" />
              <h2 className="text-xl font-semibold text-center mb-2">Our Impact</h2>
              <p className="text-center">Transforming HR processes for 1000+ companies, improving efficiency by an average of 40%.</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-16">
            <h2 className="text-2xl font-bold text-brown-dark mb-4">Why Choose Aptus HRMS?</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Comprehensive suite of HR tools in one platform</li>
              <li className="mb-2">User-friendly interface for both HR professionals and employees</li>
              <li className="mb-2">Customizable solutions to fit your unique business needs</li>
              <li className="mb-2">Robust security measures to protect sensitive data</li>
              <li className="mb-2">Regular updates and new features based on customer feedback</li>
              <li>24/7 customer support from our expert team</li>
            </ul>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brown-dark mb-6">Ready to transform your HR processes?</h2>
            <div className="flex justify-center gap-4">
              <Link to="/pricing">
                <BrownButton px={15} py={3} value="See our Plans" />
              </Link>
              <Link to="/contact">
                <WhiteButton px={15} py={3} value="Get in Touch" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;