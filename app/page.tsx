import React from 'react';
import IndexPage from './Component/Donutpage';
import UserAgeChartPage from '@/app/Component/LinePage';
import InterestsBarGraph from '@/components/InterestsBarGraph';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/SideBar';

const Page = () => {
  return (
    <div className='bg-[#dfe1e8] w-screen  '>
      <Navbar />
      <main className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center">
        <div className="w-[1600px] h-[500px] p-4 rounded-lg shadow-gray-600 shadow-sm  bg-white mt-20 ml-[260px]">
        <InterestsBarGraph />
        </div>
            <div className="flex w-screen ">
              <div className="w-1/2 p-4 ">
                <IndexPage />
              </div>
              <div className="w-1/2 p-4">
                <UserAgeChartPage />
              </div>
            </div>
          </div>
        
      </main>
    </div>
  );
};

export default Page;
