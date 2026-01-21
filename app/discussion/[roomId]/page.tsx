'use client';
import ChatComponent from "@/app/components/Chat";
import { useEffect } from "react"
import { useParams, usePathname } from "next/navigation";
import GalleryComponent from "@/app/components/Gallery";


export default function RoomIdPage(){
    const functionManager = {};
    useEffect(()=>{
        console.log("Discussion Room Page Loaded");
    },[])
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl sm:text-3xl font-semibold mt-5 mb-5">
                Discussion Room
            </h1>
            <p className="text-gray-600">This is the discussion room page.</p>
            <ChatComponent functionManager={functionManager}/>
            <GalleryComponent functionManager={functionManager} type="chat-images"/>
        </div>
    )
}