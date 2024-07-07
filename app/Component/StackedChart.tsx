// pages/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import PopularityChart from '@/components/PopularityChart';
import StackedBarChart from '@/components/StackedBarChart';

const Home: NextPage = () => {
  return (
 
      <div className='bg-white h-[550px] w-[1610px] rounded-lg mt-[-5px] ml-[250px] border shadow-gray-600 shadow-sm '>
        <h1 className='text-3xl mt-10 mb-8  text-gray-700 font-bold text-left ml-14'>Roadmap Module Analysis</h1>
        <div className='h-[400px] w-[2200px]  mt-12 ml-[50px]'>
          <StackedBarChart />
        </div>
      </div>
    
  );
};

export default Home;
