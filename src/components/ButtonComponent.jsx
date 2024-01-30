import React from 'react'

const ButtonComponent = ({title, handleClick}) => {
  return (
    <div>
      <button onClick={()=>handleClick()} className={`my-1 bg-primaryColor hover:bg-primaryColorVar text-white h-[40px] w-[415px] text-center rounded-lg`}>{title}</button>
    </div>
  )
}

export default ButtonComponent
