interface Color{
  color:string
}

const Spinner = ({color}:Color) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-${color}`}></div>
    </div>
  );
};

export default Spinner;