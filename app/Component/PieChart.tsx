// pages/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import RoadmapPieChart from '@/components/RoadmapPieChart';

const Home: NextPage = () => {
  return (
    <div>
<main className='bg-white h-[500px] w-[800px]  shadow-gray-600 shadow-sm border  mt-16 ml-[260px] rounded-lg '>
<h1 className='text-3xl mt-7 mb-8 text-gray-700 font-bold text-left ml-14'> Minutes Distribution</h1>
        <div className='flex justify-start items-start ml-10 mt-10 '>
          <RoadmapPieChart />
        </div>
      </main>
    </div>
  );
};

export default Home;
