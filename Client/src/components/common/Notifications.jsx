import React, { useEffect, useState } from 'react'
import avatar1 from '../../assets/one.jpg'
import avatar2 from '../../assets/second.jpg'
import { acceptFriendRequest, notifications } from '../../services/operations/AuthApi'
import { useSelector } from 'react-redux'


const Notifications = () => {

  const {token} = useSelector((state) => state.auth)

  const[requests, setRequests] = useState([])
  const [notificationsData, setNotificationsData] = useState([])

  const maxLength = 16

  const handleAcceptRequest = async(username) => {
    const res = await acceptFriendRequest(token,username)
    getNotifications()
  }

  const handleRejectRequest = () => {
    console.log("reject")
  }
  
  const getNotifications = async() => {
    const res = await notifications(token)
      setNotificationsData(res)
      console.log("resp",res)
  }

  useEffect(() => {
    getNotifications()
  },[])

  return (
    <div className='bg-white absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-80%] flex justify-center border-2 border-gray-300 rounded-sm p-5'>

      <div className='flex flex-col gap-2 '>

        <p className='text-center mt-4 text-xl font-semibold mb-6'>
          Notifications
        </p>

        {/* lower part */}
        <div className='mt-4 '>
          {
            notificationsData.map( (notification, index) => (
              <div className='flex mb-10 items-center ' key={index}>
                <img 
                  src={notification.sender.avatar} 
                  alt="avatar" 
                  className='h-[40px] w-[40px] rounded-full min-w-12 min-h-12'
                />

                <p className='w-full min-w-36 ml-4'>
                  {`${notification.sender.name} sent you a message`.slice(0, maxLength)}{`${notification.sender.name} sent you a message`.length > maxLength ? '...' : ''}
                </p>

                <div className='flex flex-col justify-between items-center gap-3'> 
                  <button
                    onClick={() => handleAcceptRequest(notification.sender.username)}
                   className='text-blue-900 '>
                    Accept
                  </button>

                  <button
                  onClick={handleRejectRequest}
                  className='text-red-700'>
                    Reject
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Notifications