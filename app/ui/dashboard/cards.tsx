'use client';
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import axios from 'axios';
import { useEffect, useState } from 'react';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default  function CardWrapper() {
  const [policeNumb,setPoliceNumb] =  useState(0);
  const [suspectNumb,setSuspectNumb] = useState(0);
  const [newSuspectNumb,setNewSuspectNumb] = useState(0);
  const [todayPushAddressNumb,setTodayPushAddressNumb] = useState(0);
  useEffect(()=>{
    const options = {
      methed: "GET",
      url: "/api/police/statisticNumb",
      headers: {
        'Authorization': `Basic UDAwMToxMjM0NTY=`
      },
    }
    axios.request(options).then(function (response) {
      console.log(response);
      setPoliceNumb(response.data.data.policeNumb);
      setSuspectNumb(response.data.data.suspectNumb);
      setNewSuspectNumb(response.data.data.newSuspectNumb);
      setTodayPushAddressNumb(response.data.data.todayPushAddressNumb);
    }).catch(function (error) {
      console.error(error);
    });
  },[])
  

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="警察数量" value={policeNumb} type="collected" />
      <Card title="嫌疑人数量" value={suspectNumb} type="pending" />
      <Card title="今日新增嫌疑人" value={newSuspectNumb} type="invoices" />
      <Card
        title="今日推送数量"
        value={todayPushAddressNumb}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
