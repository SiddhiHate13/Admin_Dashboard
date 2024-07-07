import 'chart.js/auto'; // Import 'chart.js/auto' to use Chart.js with automatic chart registration
import Sidebar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import BarGraph from "@/app/Component/BarGraph";
import PieChart from "@/app/Component/PieChart";
import StackedChart from "@/app/Component/StackedChart";

export default function Page() {
  return (
    <div className='bg-[#dfe1e8] '>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-start"> {/* Adjust justify-start */}
          <div className="h-screen p-4 mt-20 ml-[-300px] w-[1000px] flex"> {/* Adjust ml-[50px] */}
            <div className="w-[40%] mr-[-20px]"> {/* Adjust width and margin */}
              <PieChart />
            </div>
            <div className="w-[60%] ml-[-20px]"> {/* Adjust width and margin */}
              <BarGraph />
            </div>
          </div>
          <div className="w-[100%] mt-[-380px] ml-[75px]"> {/* Adjust width and margin */}
            <StackedChart />
          </div>
        </main>
      </div>
    </div>
  );
}
