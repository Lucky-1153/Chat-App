import React from 'react'

const IconBtn = ({  
    icon,
    onclick,
    disabled,
}) => {
  return (
    <>
        <button
            disabled={disabled}
            onClick={onclick}
        >
            {icon}
        </button>
    </>
  )
}

export default IconBtn