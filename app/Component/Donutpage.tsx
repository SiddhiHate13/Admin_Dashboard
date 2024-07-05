"use client"; // This marks the file as a client component

import React, { useEffect, useState } from 'react';
import GenderDonutChart from '@/components/GenderDonutChart '; // Adjust the path as per your project structure

interface User {
  dob: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  interested: {
    interest: string;
    _metadata: {
      uid: string;
    }
  }[];
  title: string;
  updated_at: string;
  updated_by: string;
  user_edquest_profile: {
    created_at: string;
    created_by: string;
    edcoins: number;
    level: string;
    roadmap_progresses: {
      uid: string;
      _content_type_uid: string;
    }[];
    total_completion: {
      read: number;
      video: number;
      assignment: number;
      quiz: number;
    };
    updated_at: string;
    updated_by: string;
    username_dev: string;
    publish_details: {
      environment: string;
      locale: string;
      time: string;
      user: string;
    };
  }[];
  username: string;
  publish_details: {
    environment: string;
    locale: string;
    time: string;
    user: string;
  };
}

const IndexPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [genderChartData, setGenderChartData] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    // Fetch the user data
    const fetchData = async () => {
      // Path to your JSON file in the public directory
      const response = await fetch('/userprofile.json');
      const data = await response.json();
      setUsers(data.users);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      // Extract gender data from users
      const genderData = users.reduce((acc, user) => {
        if (user.gender in acc) {
          acc[user.gender]++;
        } else {
          acc[user.gender] = 1;
        }
        return acc;
      }, {} as Record<string, number>);

      // Format data for chart
      const formattedGenderData = Object.keys(genderData).map(gender => ({
        label: gender,
        value: genderData[gender],
      }));

      setGenderChartData(formattedGenderData);
    }
  }, [users]);

  return (
  <div className='border border-red-500 h-[450px] w-[900px] rounded-lg shadow-gray-600 shadow-sm  bg-white mt-2 ml-[280px] '> {/* Added heading */}

<div className='h-[450px] w-[850px] ml-[30px]  border border-yellow-500 flex items-center justify-center '>
  
      
      {/* Check if genderChartData has been populated */}
      {genderChartData.length > 0 ? (
        <GenderDonutChart data={genderChartData} />
      ) : (
        <p>Loading...</p> // Placeholder for when data is loading
      )}
    </div>
    </div>
  );
};

export default IndexPage;

