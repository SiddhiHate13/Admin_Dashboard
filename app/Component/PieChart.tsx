// pages/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import RoadmapPieChart from '@/components/RoadmapPieChart';

const Home: NextPage = () => {
  return (
    <div>
<main className='bg-white h-[500px] w-[700px] border border-red-900 mt-20 ml-[260px] rounded-lg  flex flex-col justify-center items-center'>
<h1 className='text-[29px] mt-4 mb-4 font-semibold'> Minutes Distribution</h1>
        <div className='flex justify-center items-center mt-4'>
          <RoadmapPieChart />
        </div>
      </main>
    </div>
  );
};

export default Home;
