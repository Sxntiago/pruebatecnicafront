export const Succesfull = ({ handleBack }) => {
  return (
    <div>
      <div className='font-semibold text-green-700 text-center mb-5'>
        Your application was sent succesfully
      </div>
      <button
        onClick={handleBack}
        className='w-full bg-blue-500 text-white py-1 px-2 rounded-md mt-5 hover:bg-blue-600 transition-colors duration-300 uppercase'
      >
        back
      </button>
    </div>
  );
};
