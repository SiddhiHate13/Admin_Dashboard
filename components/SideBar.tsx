import React from 'react';
import { BsStack } from "react-icons/bs";


const Sidebar = () => {
  return (
    <div className="bg-[#FFFFFF] w-64 fixed left-0 top-[70px] flex flex-col h-full">
    {/* Button Container */}
    <div className="flex flex-1 flex-col items-center">
      <button className='bg-slate-200 hover:bg-slate-400 hover:text-white rounded-lg shadow-sm shadow-gray-400 my-14 w-[200px] h-[50px] flex items-center justify-center py-3 font-bold text-xl'>
      <BsStack className='mr-3'/>
      Overview
      </button>
    </div>
  </div>
  );
};

export default Sidebar;
