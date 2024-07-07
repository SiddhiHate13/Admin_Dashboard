// pages/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import RoadmapPieChart from '@/components/RoadmapPieChart';

const Home: NextPage = () => {
  return (
    <div>
      <main className='bg-white h-[450px] w-[600px] rounded-lg flex flex-col justify-center items-center'>
        <h1 className='text-[29px] mt-4 mb-8 font-semibold'>Pie Chart: Roadmap Minutes Distribution</h1>
        <div className='flex justify-center items-center mt-4'>
          <RoadmapPieChart />
        </div>
      </main>
    </div>
  );
};

export default Home;
