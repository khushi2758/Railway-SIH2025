import React from 'react'
import NavItems from './NavItems'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full h-[70px] bg-cyan-300/15 backdrop-blur-lg flex items-center px-6 shadow-md'>
      <div className='w-full flex justify-between items-center '>
      <div className='font-extrabold from-neutral-400'> NABULA</div> 
     <nav className='hidden sm:block font-sans'><NavItems/></nav>
   </div>
    </header>
  )
}

export default Header
