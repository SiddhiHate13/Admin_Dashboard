import 'chart.js/auto'; // Import 'chart.js/auto' to use Chart.js with automatic chart registration
import Sidebar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import BarGraph from "@/app/Component/BarGraph";
import PieChart from "@/app/Component/PieChart";
import StackedChart from "@/app/Component/StackedChart";

export default function Page() {
  return (
    <div className='bg-[#dfe1e8] w-screen '>
      <Navbar />
      <main className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center">
      
            <div className="flex w-screen ">
              <div className="w-1/2 p-4 ">
                <PieChart />
              </div>
              <div className="w-1/2 p-4">
                <BarGraph />
              </div>
            </div>
        <div>
        <StackedChart />
        </div>    
        </div>
    
      </main>
    </div>
  );
}
