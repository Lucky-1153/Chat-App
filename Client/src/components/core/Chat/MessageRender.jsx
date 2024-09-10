import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react'
import { BsFillTriangleFill } from "react-icons/bs";
import { fileFormat } from '../../../utils/features';
import AttatchmentRender from './AttatchmentRender';
import VideoThumbnail from 'react-video-thumbnail'

const MessageRender = ({
    message,
    user,
}) => {


  return (
    <div  
    className={`flex mb-0 ${message.sender.id === user ? 'justify-end' : 'justify-start'} m-4`}>
        <p className='border bg-[#e3e0e0] rounded-md p-2'>
    
            {
                message.sender.id !== user && (
                    <p className='text-xs text-green-700'>{message.sender.name}</p>
                )
            }
            {message?.content}
            {
                console.log("message is",message)
            }

{
            message.attatchments.length > 0 && (
                message.attatchments.map((attatchment, index) => {
                    const url = attatchment
                    const file = fileFormat(url)
                        
                    return (
                        <Box
                        key={index}
                        className="mt-5"
                        >
                            <a 
                            href={attatchment}
                            target='_blank'
                            
                            download
                            style={{color: "black"}}
                            >   {file.type === 'video' ? (
                                <VideoThumbnail
                                    videoUrl={url}
                                    thumbnailHandler={(thumbnail) => console.log("thumbanil is",thumbnail)}
                                    width={200}
                                    height={150}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            ) :
                                (AttatchmentRender (file, url))
                        }
                            </a>
                        </Box>
                    )
                })
            )
        }
        </p>

        <BsFillTriangleFill color='#e3e0e0' size={28} 
        className='absolute '
        style={
            message.sender.id !== user ?
            {transform: 'translateX(-18px) translateY(14px) rotate(-90deg)'}
            : {transform : ' translateX(18px) translateY(7px) rotate(90deg)'}
        }


        
        />

        
    </div>
  )
}

export default MessageRender