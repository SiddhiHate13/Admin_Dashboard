'use client'

import React from 'react';
import { BsStack } from "react-icons/bs";
import { GiProgression } from "react-icons/gi";
import Link from 'next/link'


const Sidebar: React.FC = () => {
  return (
    <div className="bg-[#FFFFFF] w-64 fixed left-0 top-[70px] flex flex-col h-full">
      {/* Button Container */}
      <div className="flex flex-1 flex-col items-center">
        <Link href='/overview' type="button" className='bg-[#ffcc66] text-black hover:bg-slate-600 hover:text-white rounded-lg shadow-sm shadow-gray-400 mt-16 my-8 w-[200px] h-[50px] flex items-center justify-center py-3 font-bold text-xl' >
          <BsStack className='mr-3' size={22}/>
         Overview
        </Link>
        <Link href='/roadmap' className='bg-[#ffcc66] text-black hover:bg-slate-600 hover:text-white rounded-lg shadow-sm shadow-gray-400 my-14 mt-1 w-[200px] h-[50px] flex items-center justify-center py-3 font-bold text-xl'>
        <GiProgression className='mr-3' size={22} />
         Roadmaps
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
