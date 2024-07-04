import React from 'react';
import Image from 'next/image';
import logo from '@/images/logo.png';

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-[70px] bg-white z-50 shadow-md'>
      <div className='flex ml-5 my-1 items-start h-full'>
        <Image src={logo} alt="Logo" width={200} height={40} />
      </div>
    </div>
  );
};

export default Navbar;
