import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/common/Navbar'
import Profile from '../components/core/Profile/index'
import ChatList from '../components/core/ChatList/index'
import Search from '../components/common/Search'
import Notifications from '../components/common/Notifications'
import NewGroup from '../components/common/NewGroup'
import { apiConnector } from '../services/ApiConnector'

import { useSelector } from 'react-redux'
import { getMyChats } from '../services/operations/ChatApi'

const Home = () => {

  const [search, setSearch] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [add, setAdd] = useState(false)

  const searchDialogRef = useRef(null)
  const notificationDialogRef = useRef(null)
  const newGroupDialogRef = useRef(null)
  
  const {token } = useSelector((state) => state.auth)

  
  useEffect(() => {
    if(search || notifications || add){
      document.addEventListener('mousedown', (event) => handleClickOutside(event, search ? searchDialogRef : notifications ? notificationDialogRef : add ? newGroupDialogRef : ""))
    } else {
      document.removeEventListener( 'mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[search, notifications, add])


  const handleClickOutside = (event , ref) => {
    if (ref === searchDialogRef && ref.current && !ref.current.contains(event.target)) {
      setSearch(false)
    }
    
    else if (ref === notificationDialogRef && ref.current && !ref.current.contains(event.target)){
      setNotifications(false)
    }

    else if( ref === newGroupDialogRef && ref.current && !ref.current.contains(event.target)){
      setAdd(false)
    }
  }



  



  return (
    <>
    
    <div className={`absolute  h-screen w-full flex-col overflow-x-auto overflow-y-hidden
            ${(search || notifications || add) && 'backdrop-filter blur-sm brightness-90 opacity-80 z-10'}
        `}
    >

        <Navbar  
          setSearch={setSearch} 
          setNotifications={setNotifications}
          setAdd={setAdd}
        />


      <div className=' flex overflow-y-hidden w-screen'>

          <ChatList />

          <Profile />

      </div>
    </div>

    {search && (
      <div 
        ref={searchDialogRef}
        className="absolute z-[20] left-1/2 top-1/2 ">
        <Search />
      </div>
        
    )}

    {notifications && 
        <div
          ref={notificationDialogRef}
          className="absolute z-[20] left-1/2 top-1/2 "
        >
          <Notifications />
        </div>   
    }

    {
      add && (
        <div
        ref={newGroupDialogRef}
        className="absolute z-[20] left-1/2 top-1/2 "
        >
          <NewGroup setAdd={setAdd}/>
        </div>
      )
    }


      
    </>
    

      
      
    
  )
}

export default Home