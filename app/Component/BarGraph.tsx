// pages/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import PopularityChart from '@/components/PopularityChart';

const Home: NextPage = () => {
  return (
    <div className='flex'>
<main className='bg-white h-[500px] w-[800px]  shadow-gray-600 shadow-sm  rounded-lg mt-16 ml-[110px] mr-1 '>    
      <h1 className='text-3xl mt-7 mb-10 text-gray-700 font-bold text-left ml-14'> Popularity Analysis</h1>
        <div className='h-[450px] w-[750px] flex justify-center items-center mt-[-95px] ml-0'>
          <PopularityChart />
        </div>
      </main>
    </div>
  );
};

export default Home;
