import React, { useEffect, useState } from 'react'
import { IoAddCircle } from "react-icons/io5";
import avatar1 from '../../assets/profile.png'
import avatar2 from '../../assets/one.jpg'
import avatar3 from '../../assets/second.jpg'
import { CiCircleMinus } from "react-icons/ci";
import { createGroup } from '../../services/operations/ChatApi';
import { useSelector } from 'react-redux';
import { searchUser } from '../../services/operations/AuthApi';


const NewGroup = ({
  setAdd
}) => {

  const users = [
    {
      id: 1,
      name: 'John Doe',
      username: "john",
      avatar:avatar1
    },
    {
      id: 2,
      name: 'Chris',
      username: 'chris',
      avatar: avatar2
    },
    {
      id: 3,
      name: 'Robert',
      username: 'robert',
      avatar: avatar3
    },
  ]

  const [selectedUsers, setSelectedUsers] = useState([])

  const {token} = useSelector((state) => state.auth)

  const handleCancelGroup = () => {
    console.log('Cancel Group Button Clicked');
  }

  const [people, setPeople] = useState([])


  const [form, setForm] = useState({
    search: ""
  })
  const {search} = form

  const changeHandler = (e) => {
    e.preventDefault()

    setForm((prevData) => ({
      ...prevData,
      [e.target.name] : e.target.value
    }))
  }

  useEffect( () => {
    ;( async() => {
     const res = await searchUser(token)
      setPeople(res?.data)
    }
    )()
  },[])

  const handleSelection = (username) => {
    setSelectedUsers((prevUsers) => [...prevUsers, username])

  }

  const handleDeselection = (username) => {
    setSelectedUsers( (prevUsers) => prevUsers.filter((user) => user !== username))
  }

  const handleCreateGroup = async() => {
    const res = await createGroup(search, selectedUsers, token)
    setAdd(false)
  }

  return (
    <div className='bg-white absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-62%] flex justify-center border-2 border-gray-300 rounded-sm p-5'>

      <div className='flex flex-col gap-2  py-2 min-w-80'>

          <div className='flex justify-center items-center'>
            <p className=' text-xl mb-5'>New Group</p>
          </div>

          <div className='w-full'>
            <input 
            type="text" 
            value={search}
            name='search'
            onChange={changeHandler}
            placeholder='Enter Group Name'
            className='border-[1px] rounded-sm w-full h-7 mb-3  focus:outline-none'
            />
          </div>

          <div>
            <p className='font-semibold'>Members</p>
          </div>

          <div>
            { people.map((user, index) => (
              <div className='flex items-center w-full gap-2 mb-3' key={index}>
                <img
                  src={user.avatar}
                  alt="avatar" 
                  className='w-[40px] h-[40px] rounded-full min-w-12 min-h-12 '
                />
                <p className='w-full'>
                  {user.name}
                </p>
                {
                  console.log(user)
                }
                {
                  selectedUsers.includes(user._id) ? (
                    <button
                    type='button'
                    onClick={() => handleDeselection(user._id)}
                    >
                      <CiCircleMinus color='red' size={30}/>
                    </button>
                  ) : (
                    <button
                    type='button'
                    onClick={()=>handleSelection(user._id)}
                    >
                      <IoAddCircle color='blue' size={30}/>
                    </button>
                  )
                }

              </div>
            ))}
          </div>

          <div className='flex justify-evenly items-center'>
            <button 
            className='text-rose-600'
            onClick={ () => setAdd(false)}
            >
              CANCEL
            </button>

            <button
            className='bg-blue-600 py-2 px-4 rounded-md text-white'
            onClick={() => handleCreateGroup()}
            >
              CREATE
            </button>
          </div>
      </div>
    </div>
  )
}

export default NewGroup