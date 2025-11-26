import { Link,useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import React from 'react'


const Navbar = () => {

    const user = {name:'Fatima Arab'}
     const   navigate = useNavigate();
    const logoutUser = ()=>{
        //logout logic here
        navigate('/');
    }
  return (
    <div className='shadow bg-white'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
         <Link to='/'>
         <img src={logo} alt="logo" className='w-auto h-11'/>
         </Link>
           <div className='flex items-center gap-4 text-sm'>
            <p className='max-sm:hidden'>Hi, {user?.name}</p>
            <button onClick={logoutUser}className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
           </div>
      </nav>
    </div>
  )
}

export default Navbar
