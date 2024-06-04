import React from 'react';

type FeatureCardProps = {
  Icon: any;
  value: string;
  onClick: () => void;
  selected: boolean;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, value, onClick, selected }) => {
  const style = selected
    ? "h-[150px] w-[150px] rounded-lg p-4 bg-snow-dark hover:bg-snow-dark transition duration-300 flex flex-col items-center justify-center cursor-pointer selected"
    : "h-[150px] w-[150px] rounded-lg p-4 bg-snow hover:bg-snow-dark transition duration-300 flex flex-col items-center justify-center cursor-pointer";

  return (
    <div className={style} onClick={onClick}>
      <Icon className="h-10 mb-4" color="#462C2C" />
      <h1 className="text-center text-brown-dark font-semibold">{value}</h1>
    </div>
  );
};

export default FeatureCard;
