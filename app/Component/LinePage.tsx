// pages/user-age-chart.tsx
"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js
import usersData from '@/public/userprofile.json'; // Adjust the path as per your project structure

// Load AgeChart dynamically to ensure it's only rendered on the client side
const AgeChart = dynamic(() => import('@/components/AgeLineChart'), { ssr: false });

interface UserProfile {
    dob: string;
    // Define other profile properties as needed
}

function calculateAge(birthday: string): number {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function categorizeUsersByAge(users: UserProfile[]): { below18: number; between18And30: number; above30: number } {
    let below18 = 0;
    let between18And30 = 0;
    let above30 = 0;

    users.forEach(user => {
        const age = calculateAge(user.dob);
        if (age < 18) {
            below18++;
        } else if (age >= 18 && age <= 30) {
            between18And30++;
        } else {
            above30++;
        }
    });

    return { below18, between18And30, above30 };
}

const UserAgeChartPage: React.FC = () => {
    const [userList, setUserList] = useState<UserProfile[]>([]);

    useEffect(() => {
        // Simulate fetching user data
        setUserList(usersData.users); // Adjust according to your JSON structure
    }, []); // Empty dependency array means this effect runs once on mount

    const ageGroups = categorizeUsersByAge(userList);

    return (
        <div className='   h-[450px] w-[670px] rounded-lg shadow-gray-600 shadow-sm  bg-white mt-1 ml-[240px] mr-[10px]'>
           <div className=' h-16 flex items-start pt-8'> <h1 className='text-3xl font-bold text-gray-900  ml-8'>Age Group Analysis Overview</h1>
           </div>
    <div className='h-[450px] w-[400px] '>
        
            <AgeChart ageGroups={ageGroups}  />
        </div>
       
        </div>
    );
};

export default UserAgeChartPage;
