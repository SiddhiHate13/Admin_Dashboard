// pages/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import PopularityChart from '@/components/PopularityChart';

const Home: NextPage = () => {
  return (
    <div className='flex'>
      <main className='bg-white h-[450px] w-[900px] rounded-lg mt-1 ml-[280px] flex flex-col justify-center items-center'>
        <h1 className='text-[29px] mt-4 mb-8 font-semibold'>Bar Graph on Roadmap Popularity Analysis</h1>
        <div className='h-[450px] w-[900px] flex justify-center items-center mt-[-100px]'>
          <PopularityChart />
        </div>
      </main>
    </div>
  );
};

export default Home;
