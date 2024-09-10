import React, { useEffect, useState } from 'react'
import avatar1 from '../../assets/one.jpg'
import avatar2 from '../../assets/second.jpg'
import avatar3 from '../../assets/profile.png'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { IoIosRemoveCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { deleteGroup, getChatDetails, getMyGroups, removeMember } from '../../services/operations/ChatApi'
import { useSelector } from 'react-redux'


const Groups = () => {

    const [groupsList, setGroupsList] = useState([])
    const [groupData, setGroupData] = useState(null)
    const navigate = useNavigate()

    const groupies = [
        {
            name: "Old Friends",
            avatar: avatar1,
        },
        {
            name: "Friends Forever",
            avatar: avatar2,
        },
        {
            name: "Changu Mangus",
            avatar: avatar3,
        },
        {
            name: "Old Friends",
            avatar: avatar1,
        },
        {
            name: "Friends Forever",
            avatar: avatar2,
        },
        {
            name: "Changu Mangus",
            avatar: avatar3,
        },
        {
            name: "Old Friends",
            avatar: avatar1,
        },
        {
            name: "Friends Forever",
            avatar: avatar2,
        },
        {
            name: "Changu Mangus",
            avatar: avatar3,
        },
        {
            name: "Old Friends",
            avatar: avatar1,
        },
        {
            name: "Friends Forever",
            avatar: avatar2,
        },
        {
            name: "Changu Mangus",
            avatar: avatar3,
        },
        {
            name: "Old Friends",
            avatar: avatar1,
        },
        {
            name: "Friends Forever",
            avatar: avatar2,
        },
        {
            name: "Changu Mangus",
            avatar: avatar3,
        },
        {
            name: "Old Friends",
            avatar: avatar1,
        },
        {
            name: "Friends Forever",
            avatar: avatar2,
        },
        {
            name: "Changu Mangus",
            avatar: avatar3,
        },
        {
            name: "Old Friends",
            avatar: avatar1,
        },
        {
            name: "Friends Forever",
            avatar: avatar2,
        },
        {
            name: "Changu Mangus",
            avatar: avatar3,
        },
        {
            name: "Old Friends",
            avatar: avatar1,
        },
        {
            name: "Friends Forever",
            avatar: avatar2,
        },
        {
            name: "Changu Mangus",
            avatar: avatar3,
        },
        {
            name: "Old Friends",
            avatar: avatar1,
        },
        {
            name: "Friends Forever",
            avatar: avatar2,
        },
        {
            name: "Changu Mangus",
            avatar: avatar3,
        }
    ]

    // const handleGroupData = () => {
    //     setGroupData(
    //         {
    //             name: "Changu Mangus",
    //             members : [

    //                     "lucky",
    //                     "raghav",
    //                     "aryan",
    //                     "yugal",
    //                     "pankaj",
    //                     "sachin",

    //             ],

    //         }
    //     )
    //     console.log("hmommm")
    // }

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        ;(async() => {
            const res = await getMyGroups(token)
            setGroupsList(res.groups)
            console.log(res.groups)
        })()
    },[])


    const handleGroupData = async(id) => {
        const group = true
        const res = await getChatDetails(token,id,group)
        setGroupData(res.chat)
        console.log("groupdata",res.chat)

    }

    const removeMemberHandler = async(userId) => {
         await removeMember(token, groupData._id, userId)
    }

    const deleteHandler = async() =>{
        await deleteGroup(token,groupData._id)
    }

  return (
    <div className='h-screen w-screen flex'>
        {/* left groups list */}
        <div className='max-w-[35%] w-[1200px] h-full bg-orange-200 flex-col overflow-y-auto scroll-smooth'>
            {
                groupsList.map((group, index) => (
                    <div key={index}
                    onClick={()=> handleGroupData(group._id)}
                    className='flex gap-5 py-4 pl-3 hover:bg-orange-300 cursor-pointer'>
                       
                        <div className='flex-1 max-w-24'>
                            {group.avatar.map((image,i) => (
                                
                                <img key={i}
                                src={image}
                                className={`h-16 absolute w-16 rounded-full border-[3px] border-white
                                    ${i === 0 ? 'z-30 left-2'
                                    : i === 1 ? 'z-20 left-6' 
                                    : 'z-10 left-10'
                                }    
                                `} />
                                
                            
                            ))}
                        </div>
                            
                            

                        <p className='relative flex-1  text-black flex justify-start items-center p-3 ml-6'>
                               { console.log("group name",group.name)}
                            {group.name}
                        </p>
                    </div>
                ))
            }
        </div>

        {/* right group data */}
        <div className='relative max-w-[65%] w-[1200px]  h-full bg-pink-800 flex justify-center items-center'>
            {
                <button className='absolute left-3 top-3 bg-black rounded-full p-1'
                onClick={() => navigate('/')}
                >
                    <IoReturnUpBackOutline size={35} color='white'/>
                </button>
            }
            {
                groupData ? (
                    <div className='flex-col  h-full  py-12'>
                        {/* gorup naem */}
                        <p className="text-3xl ">
                            Group Name - 
                            <span className='font-semibold text-4xl'> {groupData.name}</span>
                        </p>

                        {/* members div */}
                        <div className=' flex-col items-center justify-center mt-16 overflow-y-auto'>
                            <p className='flex justify-center  text-xl mb-8 sticky top-0 '>
                                Members
                            </p>
                            <div className='max-h-[400px] overflow-y-auto scroll-smooth p-1'>
                            {
                                groupData.members.map((member, index) => (
                                    <div 
                                    key={index}
                                    className='  flex gap-3 items-center justify-center mb-3 overflow-y-auto '>
                                        <img 
                                        src={member.avatar}
                                        alt="avatar" 
                                        className='w-16 h-16 rounded-full border-[3px] border-black'
                                        />
                                        <p className='font-medium flex-grow ml-3'>
                                            {member.name}
                                        </p>
                                        <button className='pr-4'
                                        onClick={() => removeMemberHandler(member._id)}
                                        >
                                            <IoIosRemoveCircle color='black' size={30}/>
                                        </button>
                                    </div>
                                ))
                            }
                            </div>
                           
                        </div>

                        {/* bottom bttons */}
                        <div className='flex items-center justify-center mt-16 gap-6'>
                            <button 
                            onClick={deleteHandler}
                            className='gap-2  flex items-center justify-center border-[3px] border-black rounded-md p-2'>
                                <MdDeleteForever 
                                
                                size={25} />
                                DELETE GROUP
                            </button>
                            <button className='flex gap-2 justify-center items-center border-[3px] border-black rounded-md p-2'>
                                <IoMdAdd size={25}/>
                                ADD MEMBER
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className='font-bold text-5xl'>
                        Select the Group to see their Data
                    </p>
                )
            }
        </div>
    </div>
  )
}

export default Groups