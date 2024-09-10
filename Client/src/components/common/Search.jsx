import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import avatar1 from '../../assets/profile.png'
import avatar2 from '../../assets/one.jpg'
import avatar3 from '../../assets/second.jpg'
import { IoAddCircle } from "react-icons/io5";
import { searchUser, sendFriendRequest } from '../../services/operations/AuthApi';
import { useSelector } from 'react-redux';

const Search = () => {

  const { token } = useSelector((state) => state.auth)
  const [findPeople, setFindPeople] = useState([])

  const [formName, setFormName] = useState({Name: ""})
  const{Name} = formName

  const searchPeople = () => {
    console.log("serach button is clicked")
  }

  useEffect( () => {
    ;( async() => {
     const res = await searchUser(token)
      setFindPeople(res?.data)
    }
    )()
  },[])

  const handleOnChange = (e) => {
    e.preventDefault()
    setFormName((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(()=> {
    const timeoutId = setTimeout(() => {
      const res = searchUser(token,Name)
      .then(({data}) => setFindPeople(data))
      .catch((e) => console.log(e))

    },1000)

    return () => {
      clearTimeout(timeoutId)
    }
  },[Name])

  const handleFriendRequest = async(username) => {
    console.log(username)
    await sendFriendRequest(token,username)
  }

  return (
    <form>
    <div className=' bg-white max-h-[400px] overflow-y-auto  absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-60%] flex justify-center border-2 border-gray-300 rounded-sm p-5'>
      <div className='flex flex-col gap-2 min-w-80'>
        <div className='sticky top-0 mb-2 bg-white'>

        <div className='text-center text-xl sticky pt-2 mb-5'>
          Find People
        </div>

        <div className='flex items-center  justify-start gap-2 border-2 border-gray rounded-sm bg-white'>
          <label 
            htmlFor="serach"
            onClick={() => searchPeople()}

            className='cursor-pointer'
          >
            <IoIosSearch color='gray' size={18}
              className='ml-1'  

            />
          </label>
          <input 
            type="text" 
            id='search'
            name='Name'
            value={Name}
            onChange={handleOnChange}
            placeholder='Search People'
            className='h-7 w-full focus:outline-none'
          />
        </div>

        </div>
        

        <div className='mt-3 '>
          {findPeople.map((user, index) => (
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
              
            }
              <button
              type='button'
              onClick={()=>handleFriendRequest(user.username)} >
                <IoAddCircle color='blue' size={30}/>
              </button>
              
            </div>
          ))}
        </div>
      </div>
    </div>
    </form>
  )
}

export default Search