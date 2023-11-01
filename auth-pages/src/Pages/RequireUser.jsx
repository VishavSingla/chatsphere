import React from 'react'
import { getItem, KEY_ACCESS_TOKEN } from '../utils/localStorageManager'
import { Outlet, Navigate } from 'react-router'

function RequireUser() {
    const user = getItem(KEY_ACCESS_TOKEN);
    // console.log('User:', user);

  return (
        user ? <Outlet/>:<Navigate to='/login'/>
  )
}

export default RequireUser;
