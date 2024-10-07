import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOut } from 'lucide-react';
import { UseUrlContext } from './../context/contextApi';
import useFetch from '@/hooks/use-fetch';
import { SignOut } from '@/DB/apiAuth';
import logo from '../assets/logo.jpeg'
import { BarLoader } from 'react-spinners';

const Header = () => {
   const navigate= useNavigate();
  
   const {loading,fnFetch:fnSignOut}=useFetch(SignOut)


   const {user,fetchUser}=UseUrlContext();
  //  console.log(user);

  return (
    <nav className='flex justify-between items-center'>
        <Link to='/'>
           <img src={logo} alt="trimmer logo" className='h-16'/>
        </Link>

        <div>
            {!user? 
               (<Button onClick={()=>navigate('/auth')}>Login</Button>)
                  : <DropdownMenu>
                      <DropdownMenuTrigger className='w-11 rounded outline-none '>
                        <Avatar>
                            <AvatarImage src={user?.user_metadata?.profile_pic}  className='object-cover'/>
                            <AvatarFallback>SK</AvatarFallback>
                        </Avatar>

                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                          <DropdownMenuLabel>{user?.user_metadata?.name }</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <LinkIcon className='mr-2 h-4 w-4'/>
                            <span onClick={()=>navigate('/dashboard')}>My Links</span>
                            </DropdownMenuItem>
                          <DropdownMenuItem className='text-red-400'>
                            <LogOut className='pr-2'/>
                            <span onClick={()=>{
                                fnSignOut().then(()=>{
                                  fetchUser();
                                  navigate("/");
                                });
                              }}>
                                Logout
                            </span>
                          </DropdownMenuItem>
                          
                      </DropdownMenuContent>
                  </DropdownMenu>
                }
        </div>
        {loading && <BarLoader className='w-full'/> }
    </nav>
  )
}

export default Header