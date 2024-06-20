import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 769);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 769);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}

export default useWindowWidth;
