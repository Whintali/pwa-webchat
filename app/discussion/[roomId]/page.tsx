'use client';
import ChatComponent from "@/app/components/Chat";
import { useEffect } from "react"
import { useParams, usePathname } from "next/navigation";


export default function RoomIdPage(){
    useEffect(()=>{
        console.log("Discussion Room Page Loaded");
    },[])
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl sm:text-3xl font-semibold mt-5 mb-5">
                Discussion Room
            </h1>
            <p className="text-gray-600">This is the discussion room page.</p>
            <ChatComponent/>
        </div>
    )
}