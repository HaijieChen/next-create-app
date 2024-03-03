'use client';
import { useUser, UserData } from "./user";
import { useRouter } from "next/navigation";
import { use, useContext, useState } from "react";
import { stringify } from "querystring";
import btoa from "btoa";
import axios from "axios";
import { unstable_noStore as noStore } from '@/node_modules/next/cache';





export async function login(username: string, password: string) {
   console.log(username + "-" + password);
   const basicCode = btoa(`${username}:${password}`);
   console.log("basic " + basicCode);
   const user: UserData = {};

   
   return user;
}

