import React from 'react';
import IndexPage from './Component/Donutpage';
import UserAgeChartPage from '@/app/Component/LinePage';
import InterestsBarGraph from '@/components/InterestsBarGraph';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/SideBar';

const Page = () => {
  return (
    <div className='bg-[#dfe1e8]'>
      <Navbar />
      <main className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center">
          <div className="w-[1200px] p-4 border border-red-800 bg-white mt-10">
            <InterestsBarGraph />
            <div className="flex w-full">
              <div className="w-1/2 p-4">
                <IndexPage />
              </div>
              <div className="w-1/2 p-4">
                <UserAgeChartPage />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
