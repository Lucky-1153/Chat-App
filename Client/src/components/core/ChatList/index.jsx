import React, { useEffect, useState } from 'react'
import img from '../../../assets/profile.png'
import pp from '../../../assets/pp.png'
import oo from '../../../assets/oo.png'
import one from '../../../assets/one.jpg'
import second from '../../../assets/second.jpg'
import IconBtn from '../../common/IconBtn'
import Chat from "../Chat/index"
import Profile from '../Profile/index'
import { FaCircle } from "react-icons/fa";
import { getMyChats } from '../../../services/operations/ChatApi'
import { useSelector } from 'react-redux'

const index = () => {

    // const [chatList, setChatList] = useState([{
    //     id: 1,
    //     img: [img,one, second],
    //     name: "Chat ",
    //     online:false,
    //     messages:["hi","hello"]
    // },
    // {id: 2,
    //     img: [img],
    //     name: "John Dee",
    //     online: true,
    //     messages: ["kya baat bro"]
    // },
    // {
    //     id:3,
    //     img: [img],
    //     name: "Chris",
    //     online: false,
    //     messages:[]
    // }
    // ])

    const [chatId, setChatId] = useState("")
    const [chatData, setChatData] = useState("")
    const [chatList, setChatList] = useState([])
    const {token} = useSelector((state) => state.auth)

    const handleSelectedChat = (Id) => {
        
        setChatId(Id)
    }

    
    useEffect(() => {
        ;(async() => {
            const res = await getMyChats(token)
            setChatList(res)
            
        }) ()
    },[])

    useEffect(() => {
        
        setChatData(chatList)
       
    },[chatId])

    

    

  return (
    <>

        {/* chatlist */}
        <div className='h-screen  overflow-hidden max-w-[25%]   w-screen'>
            {
                chatList.map((chat,index) => (
                    <div 
                        className='flex p-2  min-h-[80px] hover:bg-black group cursor-pointer' 
                        onClick={() => handleSelectedChat(chat._id)}
                        key={index}
                    >
                        {/* iamge div */}
                        <div className='flex-1 '>
                            {
                                chat.avatar.map((image,i) => (
                                    chat.avatar.length > 1 ? (
                                        <img key={i}
                                        src={image}
                                        className={`h-16 absolute w-16 rounded-full border-[3px] border-white
                                            ${i === 0 ? 'z-30 left-2'
                                            : i === 1 ? 'z-20 left-6' 
                                            : 'z-10 left-10'
                                        }    
                                        `}
                                    />
                                    ) : (
                                        <img key={index}
                                            src={image}
                                            className='h-16 w-16 rounded-full border-[3px] border-white'
                                        />
                                    )
                                
                                ))
                            }
                        </div>
                        {/* name div */}
                        <div className='relative flex-1 flex  items-center justify-start group-hover:text-white'>
                            {chat.name}
                            {/* new messages alert */}
                            {/* {
                            chat.messages.length > 0 && (
                                <p className='absolute text-black group-hover:text-white bottom-0 text-xs'>
                                    {chat.messages.length} new messages
                                </p>
                            )
                            } */}
                        </div>
                        {/* {
                            chat.img.length === 1 && chat.online === true && (
                                <FaCircle color='green' size={10} />
                            )
                        } */}
                        
                    </div>
                    
                ))
            }
        </div>

        {/* chat */}
        {
            chatId ? (
                <Chat chatData={chatData}/> 
            ) : (
                <div className='bg-[#F7F7F7] w-full flex  justify-center text-3xl'>
                    <p className='mt-48'>
                        Select someone to start Messaging
                    </p>
                </div>
            )
            
            // <Profile chatData={chatData} />
        }
        
        
        
        
        
    </>
  )
}

export default index