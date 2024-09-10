import React from 'react'
import { BarLoader } from 'react-spinners'
const Loader = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <BarLoader color={'#F26D7A'}  size={400} />
      </div>
  )
}

export default Loader