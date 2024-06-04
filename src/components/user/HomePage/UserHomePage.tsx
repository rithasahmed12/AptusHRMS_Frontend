import NavBar from "../common/NavBar";
import FeatureComponent from "./FeatureComponent";
import MainComponent from "./MainComponent";
import ProgressBar from "../common/ProgressBar";
import BrownButton from "../common/BrownButton";
import Footer from "../common/Footer";

type Props = {};

const UserHomePage = (props: Props) => {
  return (
    <>
      <NavBar />
      <MainComponent />
      <FeatureComponent />
      <ProgressBar />
      <div className="h-[200px] w-full flex flex-col items-center justify-center mt-5">
        <BrownButton px={40} py={15} value={"Book Your Free Demo"} />
        <h1 className="mt-2 font-bold text-brown-dark text-center md:text-left lg:text-2xl md:text-xl sm:text-lg mb-3">
          Get Your Free 7 days trial
        </h1>
      </div>
      <Footer/>
    </>
  );
};

export default UserHomePage;
