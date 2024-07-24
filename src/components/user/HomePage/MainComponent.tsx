import { useState, useEffect } from 'react';
import homeBanner from "../../../assets/home-banner.png";
import BrownButton from "../common/BrownButton";
import WhiteButton from "../common/WhiteButton";
import { Link } from 'react-router-dom';


const MainComponent = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640); 
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="flex bg-snow max-h-[1000px] justify-center">
        <div className="max-w-[900px] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-bold lg:text-3xl md:text-2xl sm:text-lg mb-2">
              Streamline your HR Processes with Aptus HRMS
            </h1>
            <p className="ms-2 mb-8 text-[13px] lg:text-base md:text-sm sm:text-xs">
              Transform your HR operations with Aptus HRMS, a comprehensive
              solution designed to simplify and optimize every aspect of human
              resource management.
            </p>

            <div className="flex gap-3 justify-center">
              <BrownButton
                px={15}
                py={4}
                value="Start your Free Trial Account"
              />
              {!isSmallScreen && (
                <Link to='contact'>
                <WhiteButton 
                 px={15}
                 py={4}
                 value="Get In Touch"
                />
                </Link>
              )}
            </div>
            {isSmallScreen && (
                <div className='mt-3 mb-3'>
                <Link to='contact'>
                <WhiteButton 
                 px={15}
                 py={4}
                 value="Get In Touch"
                />
                </Link>
                </div>
              
            )}
          </div>
        </div>
        {!isSmallScreen && (
          <div>
            <img src={homeBanner} alt="home-Banner" width={400} />
          </div>
        )}
      </div>
    </>
  );
};

export default MainComponent;
