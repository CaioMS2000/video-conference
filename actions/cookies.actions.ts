"use server";
import { cookies } from 'next/headers'
 

export async function getAllCookies(){
    const cookieStore = cookies()
    console.log(cookieStore.getAll())
}

export async function setCookie(name: string, data: Record<string, any>){
    const cookieStore = cookies()
    cookieStore.set(name, JSON.stringify(data))
}

export async function getCookie(name: string){
    const cookieStore = cookies()
    return cookieStore.get(name)
}