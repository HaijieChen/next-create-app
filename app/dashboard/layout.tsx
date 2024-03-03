'use client';
import SideNav from '@/app/ui/dashboard/sidenav';
import { LoginAuth, UserProvider } from '../lib/user';
import { useRouter } from 'next/navigation';
import { useUser } from '../lib/user';

export default function Layout({children}:{children:React.ReactNode}){

    return (
        <UserProvider>
                <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                    <div className="w-full flex-none md:w-64">
                        <SideNav/>
                    </div>
                    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
                </div>
        </UserProvider>
       
    );
}


