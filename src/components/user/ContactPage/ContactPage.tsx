import { useState, useEffect } from "react";
import NavBar from "../common/NavBar";
import ContactForm from "./ContactForm";
import Footer from "../common/Footer";

type Props = {};

const ContactPage = (props: Props) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 778);
    };

    handleResize(); // Call initially to set the initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <NavBar />
      {/* Contact Form Area */}
      <div
        className={`${
          isMobile ? "flex-col gap-6 items-center" : "h-[600px] flex gap-36"
        } bg-gradient-brown flex  justify-center items-center overflow-x-hidden`}
      >
        <div className={`${isMobile ? "w-full mt-10 ms-10" : "flex"} flex-col justify-center gap-8 items-start`}>
          <div>
            <h1 className="text-white text-4xl font-semibold">Let's Talk</h1>
            <p className="text-white">Our Team is Here To Help!</p>
          </div>
          <div className="mt-4">
            <h1 className="text-white text-2xl font-semibold">Interested in Product Demo?</h1>
            <p className="text-white">1800-1233-1234</p>
            <p className="text-white">sales@aptus.com</p>
          </div>
          <div className="mt-4">
            <h1 className="text-white text-2xl font-semibold">Need help?</h1>
            <p className="text-white">sales@aptus.com</p>
          </div>
        </div>

        <div className={`${isMobile ? "mb-10" : "flex"} justify-end items-center`}>
          <ContactForm />
        </div>
      </div>
      {/* Country bars */}
      <div className="text-center mt-5 mb-10 ">
        <h1 className="text-brown-dark text-2xl font-bold">Our Locations</h1>
        <div className={`${isMobile ? "flex-row" : "flex"} mt-5 ms-2  justify-center gap-14`}>
          <button className="border mb-2 me-2 border-brown-dark w-[140px] py-2 rounded-md hover:bg-snow-dark transition duration-500">
            Kozhikode
          </button>
          <button className="border mb-2 me-2 border-brown-dark w-[150px] py-2 rounded-md hover:bg-snow-dark transition duration-500">
            Kochi
          </button>
          <button className="border mb-2 me-2 border-brown-dark w-[150px] py-2 rounded-md hover:bg-snow-dark transition duration-500">
            Chennai
          </button>
          <button className="border mb-2 me-2 border-brown-dark w-[150px] py-2 rounded-md hover:bg-snow-dark transition duration-500">
            Mumbai
          </button>
          <button className="border mb-2 me-2 border-brown-dark w-[150px] py-2 rounded-md hover:bg-snow-dark transition duration-500">
            Bengaluru
          </button>
          <button className="border mb-2 me-2 border-brown-dark w-[150px] py-2 rounded-md hover:bg-snow-dark transition duration-500">
            Hyderabad
          </button>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactPage;
