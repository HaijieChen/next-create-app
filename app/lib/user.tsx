// UserContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface UserData {
  username?: any;
  password?: any;
  name?: string;
  // 其他用户信息字段
}

 interface UserContextProps {
  children: ReactNode;
}

interface UserContextValue {
  userData: UserData | null | undefined;
  setUserInfo: (newUserInfo: UserData) => void;
}

export const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>();
  const setUserInfo = (newUserInfo: UserData) => {
    console.log(111);
    setUserData(newUserInfo);
  };
  return (
    <UserContext.Provider value={{ userData, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const LoginAuth:React.FC<UserContextProps>=({children})=>{
  const router =  useRouter();
  const userContext = useContext(UserContext);
  console.log("checkLogin=>"+userContext?.userData);
  if(userContext?.userData==null){
    router.push("/login");
  }
   return (
     <div> 
       {children}
     </div>
   )
}



export const useUser = (): UserContextValue => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};






