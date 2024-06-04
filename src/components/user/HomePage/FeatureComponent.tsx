import { useEffect, useState } from "react";
import hrmsSoftware from "../../../assets/hrms-software.png";
import payrollSoftware from "../../../assets/payroll-software.png";
import leaveManagement from "../../../assets/leave-management.png";
import attendanceManagement from "../../../assets/attendance_management.png";
import selfServicePortal from "../../../assets/selfservice-Mangement.png";
import creditAndSavings from "../../../assets/credit-savings.png";
import recruitment from "../../../assets/recruitment.png";
import { Link } from "react-router-dom";
import FeatureCard from "../common/FeatureCard";
import WhiteButton from "../common/WhiteButton";
import {
  UserPlusIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserCircleIcon,
  CreditCardIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

type Feature = {
  description: string;
  image: string;
};

const FeatureComponent = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features: Record<string, Feature> = {
    "HRMS software": {
      description:
        "Our HRMS software revolutionizes the way you manage your human resources, empowering you to simplify and accelerate HR operations like never before. Designed to deliver a world-class employee experience, our platform ensures that your workforce remains engaged, productive, and motivated.",
      image: hrmsSoftware,
    },
    "Payroll software": {
      description:
        "Our Payroll software simplifies payroll management, automating repetitive tasks and ensuring compliance with local regulations. With features like automated tax calculations, customizable payslip templates, and integration with HR systems, you can streamline your payroll processes and ensure accurate and timely payments.",
      image: payrollSoftware,
    },
    "Leave Management": {
      description:
        "Our Leave Management module allows employees to request time off, managers to approve or deny requests, and HR to track and manage all types of leave. With features like calendar views, customizable leave policies, and integration with attendance systems, you can effectively manage leave and ensure compliance with company policies.",
      image: leaveManagement,
    },
    "Attendance Management": {
      description:
        "Our Attendance Management system helps you keep track of employee attendance, ensuring accurate records and efficient monitoring of work hours. With features like clock-in/out mechanisms, shift scheduling, and real-time reporting, you can streamline attendance tracking and improve workforce management.",
      image: attendanceManagement,
    },
    "Employee Self service portal": {
      description:
        "Our Employee Self-Service Portal empowers your employees by giving them access to their HR information and allowing them to perform various tasks on their own. From viewing pay stubs to updating personal information, our portal enhances employee satisfaction and reduces HR workload.",
      image: selfServicePortal,
    },
    "Credit & Savings Facility": {
      description:
        "Our Credit & Savings Facility provides your employees with access to credit and savings options, promoting financial wellness and stability. With flexible credit options and automated savings features, our platform helps employees manage their finances effectively and achieve their financial goals.",
      image: creditAndSavings,
    },
    "Job Recruitment": {
      description:
        "Our Job Recruitment solution streamlines the recruitment process, from job posting to candidate selection. With features like applicant tracking, resume parsing, and interview scheduling, our platform helps you attract top talent and build a strong team.",
      image: recruitment,
    },
  };

  const handleFeatureClick = (feature: string) => {
    setSelectedFeature(feature);
  };

  useEffect(() => {
    setSelectedFeature("HRMS software");
  }, []);

  return (
    <>
      <div className="mb-10 mt-10 ">
        <h1 className="font-bold lg:text-3xl text-brown-dark text-center md:text-2xl sm:text-lg ">
          [ onboarding to offboarding] One HRMS for HR and payroll
        </h1>
      </div>
      {/* Feature Select components */}
      <div className="flex flex-wrap gap-4 md:gap-10 justify-center mt-10 overflow-auto">
        {Object.entries(features).map(([feature, _]) => (
          <FeatureCard
            key={feature}
            Icon={getIconByName(feature)}
            value={feature}
            onClick={() => handleFeatureClick(feature)}
            selected={selectedFeature === feature}
          />
        ))}
      </div>
      {/* Feature Description */}
      <div className="h-[550px] bg-snow mt-10 flex flex-col md:flex-row sm:h-[600px] gap-5 items-center justify-center">
        {/* For Picture */}
        <div className="md:w-[250px]">
          {selectedFeature && (
            <img
              src={features[selectedFeature].image}
              alt={selectedFeature}
              className="w-full h-[200px] sm:max-h-[200px] sm:object-contain"
            />
          )}
        </div>
        {/* For Description */}
        <div className="max-w-[550px] flex flex-col justify-center">
          {selectedFeature && (
            <>
              <h1 className="font-bold text-brown-dark text-center md:text-left lg:text-2xl md:text-xl sm:text-lg mb-3">
                {selectedFeature}
              </h1>
              <p className="ms-1 me-1 mb-2">
                {features[selectedFeature].description}
              </p>
              <div className="flex justify-center md:justify-start">
                <Link to="/pricing">
                <WhiteButton px={12} py={3} value={"See our Plans"} />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

// Helper function to get icon by feature name
const getIconByName = (featureName: string) => {
  switch (featureName) {
    case "HRMS software":
      return UserPlusIcon;
    case "Payroll software":
      return BanknotesIcon;
    case "Leave Management":
      return CalendarDaysIcon;
    case "Attendance Management":
      return ClockIcon;
    case "Employee Self service portal":
      return UserCircleIcon;
    case "Credit & Savings Facility":
      return CreditCardIcon;
    case "Job Recruitment":
      return DocumentMagnifyingGlassIcon;
    default:
      return null;
  }
};

export default FeatureComponent;
