import { Avatar } from '@mui/material';
import React from 'react'

function Navbar() {
  return (
    <div className='h-60 border-b border-gray-300'>
      <div className='max-w-4xl flex center justify-between mx-auto'>
        <div className='text-3xl font-bold'>Social Media</div>
        <div className='right-side flex'>
          <div className='profile'>
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Navbar;
