import React, { useRef, useState } from 'react'
import { bgGradient } from '../constants/Color'
import { FaCamera } from "react-icons/fa";
import dp from '../assets/dp.png'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import { signup, login } from '../services/operations/AuthApi';
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const [previewSource, setPreviewSource] = useState(dp)
    const [isLogin, setIsLogin] = useState(true)
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate()
    const fileInputRef = useRef()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        Name: "",
        bio: "",
        username: "",
        password: "",
       
    })

    const{Name, username, password, bio} = formData
    // const {
    //     register,
    //     handleSubmit,
    //     setValue,
    //     getValues,
    //     formState: { errors },
    // } = useForm()

    const handleClick = () => {
       
        fileInputRef.current.click()
        event.preventDefault();
    }

    const handleFileChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        if(file){
            previewFile(file)
            
            setSelectedImage(file);
        }
    }

    const previewFile = (file) => {
 
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleOnChange = (e) => {
        e.preventDefault()
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

    const handleOnLogin = (e) => {
        e.preventDefault()
        
        login(username,password,navigate, dispatch)
    }
 
    const handleOnSignup = (event) => {
        event.preventDefault();

        signup(
            Name,
            bio,
            username,
            password,
            selectedImage,
            navigate
        )
    }

  return (
    <div 
    style={{
        backgroundImage: bgGradient,
      }}
    className=' h-screen w-screen flex justify-center items-center'>
        
        {
            isLogin ? (
                <form 
                onSubmit={handleOnLogin}
                >
                    <div className='bg-white flex flex-col items-center justify-center py-6 px-10 border-0 rounded-lg shadow-sm shadow-zinc-600'>

                    <p className='text-2xl mb-12 mt-6'>
                        Login
                    </p>

                    <div className='flex-col  items-center justify-center mb-10 '>
                        <div className='flex gap-1 mb-6'>
                            <label 
                            htmlFor="username"
                            className='flex justify-center items-center'
                            >
                                Username : 
                            </label>
                            <input 
                            name='username'
                            onChange={handleOnChange}
                            value={username}
                            type="text" 
                            id="username"
                            placeholder='Enter Username'
                            className='border-[3px] rounded-md p-2 ml-5'
                            />
                        </div>

                        <div className='flex gap-1'>
                            <label 
                            htmlFor="password"
                            className='flex justify-center items-center'
                            >
                                Password : 
                            </label>
                            <input 
                            placeholder='Enter the password'
                            type="password" 
                            onChange={handleOnChange}
                            name='password'
                            value={password}
                            id="password"
                            className='border-[3px]  rounded-md p-2 ml-5'
                            />
                        </div>

                    </div>

                    <div className='w-full '>
                        <button 
                        type='submit'
                        className='flex w-full justify-center items-center bg-blue-500 p-2 flex-grow rounded-md mb-4'>
                            LOGIN
                        </button>

                        <p className='flex justify-center items-center mb-4'>
                            OR
                        </p>

                        <button 
                        onClick={() => setIsLogin(false)}
                        className='flex w-full justify-center items-center mb-4 text-blue-500'>
                            SIGN UP Instead
                        </button>
                    </div>
                    </div>
                </form>
                
            ) : (

                <form enctype="multipart/form-data"
                onSubmit={handleOnSignup}
                >
                   
                    <div className='bg-white flex flex-col items-center justify-center py-2 px-10 border-0 rounded-lg shadow-sm shadow-zinc-600'>

                        <p className='text-2xl mb-6 mt-6'>
                            Sign Up
                        </p>

                        <div>
                            <img src={previewSource } 
                            alt="avatar image" 
                            className='object-cover w-[180px] h-[180px] rounded-full'
                            />

                            <input 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className='hidden'
                            type="file" 
                            
                            accept='image/png, image/gif, image/jpeg image/jpg'
                            />

                            <button
                            onClick={() => handleClick()}

                            >
                                <FaCamera size={35}  className=' absolute translate-x-[142px] -translate-y-16 '/>
                            </button>
                        </div>

                        <div className='flex-col  items-center justify-center mb-10 '>
                                                    
                            <div className='flex gap-1 mb-6'>
                                <label 
                                htmlFor="name"
                                className='flex justify-start items-center min-w-[82px]'
                                >
                                    Name : 
                                </label>
                                <input 
                                type="text" 
                                id="name"
                                name='Name'
                                value={Name}
                                onChange={handleOnChange}
                                placeholder='Enter Name'
                                className='border-[3px] rounded-md p-2 ml-5'
                                />
                            </div>
                                                    
                            <div className='flex gap-1 mb-6'>
                                <label 
                                htmlFor="bio"
                                className='flex justify-start items-center min-w-[82px]'
                                >
                                    Bio : 
                                </label>
                                <input 
                                type="text" 
                                id="bio"
                                value={bio}
                                name='bio'
                                onChange={handleOnChange}
                                placeholder='Enter Bio'
                                className='border-[3px] rounded-md p-2 ml-5'
                                />
                            </div>

                            <div className='flex gap-1 mb-6'>
                                <label 
                                htmlFor="username"
                                className='flex justify-center items-center min-w-[82px]'
                                >
                                    Username : 
                                </label>
                                <input 
                                type="text" 
                                value={username}
                                name='username'
                                onChange={handleOnChange}
                                id="username"
                                placeholder='Enter Username'
                                className='border-[3px] rounded-md p-2 ml-5'
                                />
                            </div>

                            <div className='flex gap-1'>
                                <label 
                                htmlFor="password"
                                className='flex justify-center items-center min-w-[82px]'
                                >
                                    Password : 
                                </label>
                                <input 
                                placeholder='Enter the password'
                                type="password" 
                                value={password}
                                name='password'
                                onChange={handleOnChange}
                                id="password"
                                className='border-[3px]  rounded-md p-2 ml-5'
                                />
                            </div>

                        </div>

                        <div className='w-full '>
                            <button 
                            type='submit'
                            className='flex w-full justify-center items-center bg-blue-500 p-2 flex-grow rounded-md mb-4'>
                                SIGN UP
                            </button>

                            <p className='flex justify-center items-center mb-4'>
                                OR
                            </p>

                            <button 
                            onClick={() => setIsLogin(true)}
                            className='flex w-full justify-center items-center mb-4 text-blue-500'>
                                LOGIN Instead
                            </button>
                        </div>
                    </div>

                </form>
                
            )
        }
       
        
    </div>
  )
}

export default Login