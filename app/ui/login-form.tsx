'use client';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useState,createContext,useContext, useEffect, use } from 'react';
import Link from '@/node_modules/next/link';
import { useRouter } from '@/node_modules/next/navigation';
import { stringify } from 'querystring';
import axios from 'axios';
import { request } from 'http';
import { url } from 'inspector';

const HandleChangeContext = createContext({});



export default function LoginForm() {
  const router = useRouter();

   
  const formAction = async (formData:FormData)=>{
    const username = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const btoaStr = btoa(`${username}:${password}`);
    const options = {
      methed:"GET",
      url:"/api/police",
      headers:{
        'Authorization':`Basic ${btoaStr}`
      },
    }
    const data =await axios(options);   
     router.push('/dashboard');
  }

  return (
    <form className="space-y-3"  action={formAction} >
      <div className="flex rounded-lg bg-gray-50 px-6 pb-4 pt-8 h-screen bg-cover bg-center w-full items-center justify-center" style={{backgroundImage:'url("/login-form.jpg")'}}   >
        
            
        <div className="w-6/12 ">

           <h1 className={`${lusitana.className} mb-3 text-2xl self-center relative text-white`}>
              猎鹰平台
            </h1>
       
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              警号
            </label>
            <div className="relative self-center">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-white"
                id="email"
                type="text"
                name="email"
                placeholder="输入警号"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              密码
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-white"
                id="password"
                type="password"
                name="password"
                placeholder="输入密码"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <LoginButton />
          </div>
        </div>
          
        <div className="flex h-8 items-end space-x-1 w-6/12">
          {/* Add form errors here */}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  return (
    <Button className="mt-4 w-6/12" type='submit' >
      登录<ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
