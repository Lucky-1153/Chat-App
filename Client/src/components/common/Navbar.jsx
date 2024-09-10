import React, { Suspense, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';
import IconBtn from './IconBtn';
import { FaPlus } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { FaBell } from "react-icons/fa";
import Search from './Search';

import Notifications from './Notifications';
import { Logout } from './Logout';
import {RingLoader} from 'react-spinners'
import Loader from './Loader';
import { Backdrop } from '@mui/material';
import { RxHamburgerMenu } from "react-icons/rx";
import { logout } from '../../services/operations/AuthApi';
import { useDispatch } from 'react-redux';

function Navbar({

  setSearch,
  setNotifications,
  setAdd
}) {

  
  const dispatch = useDispatch()
  
  const [exit, setExit] = useState(false)
  const [groups, setGroups] = useState(false)
  const navigate = useNavigate()
  const [mobileView, setMobileView] = useState(false)


  useEffect( () => {
    if(exit)
      // dispatch(logout(navigate))
    logout(navigate,dispatch)
  },[exit])

  return (
    <div

      className={` bg-[#F26D7A] flex   w-full justify-between h-20
         
      `}
    >

      <div className='text-4xl py-4 pl-8'>
        <p className='text-white'>Chattu </p>
      </div>

      <div className='hidden md:flex pt-6'>
        <div className='mr-8'>
        <IconBtn 
          icon = {<FaSearch color='white' size={30}/>}
          disabled={false}  
          onclick={() => setSearch((prev) => !prev)}
          
        />
        </div>
        
        <div className='mr-8'>
          <IconBtn 
            icon={<FaPlus color='white' size={30} />}
            disabled={false}
            onclick={() => setAdd((prev) => !prev)}
            className='mr-5'
          />
        </div>
        

        <div className='mr-8'>
          <IconBtn 
            icon={<IoPeopleSharp color='white' size={30}/>}
            disabled={false}
            onclick={() => setGroups((prev) => !prev)}
            className='mr-5'
          />
        </div>
        

        <div className='mr-8'>
          <IconBtn 
            icon={<FaBell color="white" size={30}/>}
            disabled={false}
            onclick={() => setNotifications((prev) => !prev)}
            className='mr-5'
          />
        </div>


        <div className='mr-8'>
          <IconBtn 
            icon={<ImExit color='white' size={30}/>}
            disabled={false}
            onclick={() => setExit(true)}
            className='mr-5'
          />
        </div>
        
      </div>

      <div className='md:hidden pt-5 mr-4 '>
        <IconBtn 
          icon={<RxHamburgerMenu color='white' size={40}/>}
          disabled={false}
          onclick={() => setMobileView((prev) => !prev)}
        />
      </div>

      {mobileView && 
        (
          <div className='bg-[#F26D7A] absolute right-0 max-w-28 p-4 top-20'>
            <div className='bg-slate-900 h-1 w-full absolute -top-[0.5px] -left-[1px]'></div>
            <div className='flex flex-col '>
              
              <div className='p-1'>
              <IconBtn 
                icon = {<FaSearch color='white' size={20}/>}
                disabled={false}  
                onclick={() => {
                  setSearch((prev) => !prev)
                  setMobileView(false)
                }} 
              />
              </div>

              <div className='p-1'>
          <IconBtn 
            icon={<FaPlus color='white' size={30} />}
            disabled={false}
            onclick={() => setAdd((prev) => !prev)}
            className=''
          />
        </div>

        <div className='p-1'>
          <IconBtn 
            icon={<IoPeopleSharp color='white' size={30}/>}
            disabled={false}
            onclick={() => setNotifications((prev) => !prev)}
            className=''
          />
        </div>

        <div className='p-1'>
          <IconBtn 
            icon={<FaBell color="white" size={30}/>}
            disabled={false}
            onclick={() => setNotifications((prev) => !prev)}
            className=''
          />
        </div>

        <div className='p-1'>
          <IconBtn 
            icon={<ImExit color='white' size={30}/>}
            disabled={false}
            onclick={() => setExit(true)}
            className=''
          />
        </div>

            </div>
          </div>
        )
      }

      {
        groups && (
          navigate("/groups")
        )
      }
      
      
      
    </div>
  )
}

export default Navbar

