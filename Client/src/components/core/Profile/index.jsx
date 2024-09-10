import React, { useEffect } from 'react'
import ProfileImg from '../../../assets/profile.png'
import { CiAt } from "react-icons/ci";
import { LiaDiscord } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";
import { useSelector } from 'react-redux';


const index = () => {

  const { user } = useSelector((state) => state.auth)

  return (
    <div className='flex justify-center bg-neutral-900 h-screen max-w-[25%] w-[1200px] right-0 ml-auto'>
      <div className='flex-col max-w-[80%] relative items-center'>
        <div className='flex justify-center'>
         
          <img 
            src={user.avatar} 
            alt="Profile Image" 
            className='relative rounded-full h-44 w-44 border-white border-4 top-[40px]'
          />
        </div>
        <div className='flex-col justify-center relative top-16 '>
          <p className='text-gray-300 text-sm'>
           {user.bio}
          </p>
          <p className='text-gray-600 font-bold flex justify-center'>
            Bio
          </p>
        </div>
        <div className='flex-col mt-28'>
          <div className='flex  justify-center gap-3'>
            <div className='flex justify-center items-center '>
              <CiAt color='gray' size={30}/>
            </div>
            <div className='flex-col  justify-center items-center'>
              <p className='text-gray-400 font-bold'>{user.name}</p>
              <p className='text-gray-700 font-bold text-sm'>{user.username}</p>
            </div>
      
          </div>
          <div className='flex gap-4 -ml-5 justify-center items-center mt-4'>
            <div className='flex justify-center items-center'>
              <LiaDiscord color='gray' size={30}/>
            </div>

            <div className='flex-col items-center justify-center'>
              <p className='text-gray-400 font-bold'>lucky</p>
              <p className='text-gray-700 font-bold text-sm'>Name</p>
            </div>
          </div>

          <div className='flex gap-4 ml-7 items-center justify-center mt-4'>
            <div className=''>
              <SlCalender color='gray' size={27}/>
            </div>
{/* use moments here */}
            <div className='flex-col justify-center items-center'>
              <p  className='text-gray-400 font-bold'>a month ago</p>
              <p  className='text-gray-700 font-bold text-sm'>Joinded</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index