import React from 'react'
import IndexPage from './Component/Donutpage'
 import  UserAgeChartPage from '@/app/Component/LinePage'

const page = () => {
  return (
    <div className="flex">
            <div className="w-1/2 p-4">
                <IndexPage />
            </div>
            <div className="w-1/2 p-4 ">
                <UserAgeChartPage />
            </div>
        </div>
  )
}

export default page
