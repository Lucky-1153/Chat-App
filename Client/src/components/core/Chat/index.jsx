import React, { useState } from 'react'
import { TextField, IconButton, InputAdornment } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { LuPaperclip } from "react-icons/lu";
import { RiSendPlaneFill } from "react-icons/ri";
import MessageRender from './MessageRender';
import profile from '../../../assets/profile.png'
const index = ({chatData}) => {

    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
      console.log('Message:', message);
      setMessage('');
    };
  
    const handleFileSelect = (event) => {
      console.log('Files:', event.target.files);
    };

    const handleFileInput = (event) => {

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(message)
    }

    const user= "123"
    const messages = [
        // {
        //     id: 1,
        //     content: "whats up ?",
        //     sender : {
        //         id: "121",
        //         name: "chawani"
        //     },
        //     attatchments: [
        //         "https://res.cloudinary.com/dbqzrsug0/video/upload/v1723998481/codehelp/n9v6af7dekoa94cstv03.mp4",
        //         "https://res.cloudinary.com/dbqzrsug0/video/upload/v1723986269/codehelp/pspyqce5aextvsb6bydz.mp4",
     
        //     ]
        // },
        {
            id: 2, 
            content: "Am Good. You?",
            sender: {
                id: "123",
                name: "lucky"
            },
            attatchments: [
                profile
            ]
        }
     ]
  

  return (
    <div className='h-screen overflow-hidden max-w-[50%]  w-[800px]'>

    {/* main chat */}
        <div 
        className='max-h-[81%]  h-[1200px] flex-col justify-end  w-full bg-[#F7F7F7] overflow-x-hidden overflow-y-auto'
        >
            {
                messages.map((message, index) => (
                    
                    <MessageRender message={message} user={user}/>

                ))
            }
        </div>

    {/* inputfield and send button */}
        <form onSubmit={handleSubmit}>
        <div className='flex w-full items-center justify-center bottom-4'>

            <div className='flex flex-grow bg-[#F7F7F7] gap-3 p-3 rounded-3xl max-h-28 mr-3 ml-2 mt-2'>
                
                <label htmlFor="input-chat" className=''>
                    <LuPaperclip color='gray' className='' size={30}/>
                </label>

                <input 
                    type="file" 
                    className='hidden'
                    id='input-chat'
                    onChange={(event) => event.target.files}
                />

                <input 
                    type="text" 
                    className='bg-[#F7F7F7] flex-grow focus:outline-none'
                    placeholder='Type your Messages'
                    onChange={(e) => setMessage(e.target.value)}
                />

            </div>

            <button 
            type='submit'
            className=' min-h-10 min-w-10 relative right-0 rounded-full flex justify-center items-center bg-[#F26D7A] mr-2 mt-2'
            >
                <RiSendPlaneFill size={30} color='white' className='p-[1px]  '/>
            </button>
            
        </div>
        </form>
    </div>
  )
}

export default index