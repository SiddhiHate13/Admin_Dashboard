import React from 'react';
import EdCoinsPieChart from '@/components/EdcoinsPieChart';

const Pie: React.FC = () => {
  // Sample interestData based on the roadmap provided
  const interestData = {
    interest: 'Coding',
    edcoinsData: [
      { level: 'Reading', edcoins: 10 },
      { level: 'Video', edcoins: 40 },
      { level: 'Quiz', edcoins: 30 }
      // Add more data points as needed based on your roadmap structure
    ]
  };

  return (
    <div className='bg-[#dfe1e8] w-screen'>
      {/* Your other components */}
      <main className="flex">
        <div className="flex-1 flex flex-col items-center">
          <div className="w-[800px] h-[600px] p-4 rounded-lg shadow-gray-600 shadow-sm bg-white mt-20 ml-[260px]">
            <EdCoinsPieChart interestData={interestData} />
          </div>
          {/* Other content */}
        </div>
      </main>
    </div>
  );
};

export default Pie;
