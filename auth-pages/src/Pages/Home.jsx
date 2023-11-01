import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import axiosClient from '../utils/axiosClient';
import Navbar from '../components/Navbar';
import { Avatar } from '@mui/material';

function Home(){
  
  return (
    <div>
      <Navbar />
      <Outlet />
      <Avatar />
      <Link to="/login">
        <Button className='mu-10 p-10' variant="contained">
          Sign In
        </Button>
      </Link>
      <Link to="/signup">
        <Button className='mu-10 p-10' variant="contained">
          Sign Up
        </Button>
      </Link>
    </div>
  );
}

export default Home;

// {data && (
//   <div>
//     <pre>{JSON.stringify(data, null, 2)}</pre>
//   </div>
// )}

