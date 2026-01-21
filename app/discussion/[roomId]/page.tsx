'use client';
import ChatComponent from "@/app/components/Chat";
import { useEffect } from "react"
import { useParams, usePathname } from "next/navigation";
import GalleryComponent from "@/app/components/Gallery";


export default function RoomIdPage(){
    const {roomId} = useParams();
    const functionManager = {};
    useEffect(()=>{
        console.log(`Discussion Room ${roomId} Page Loaded`);
    },[])
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl sm:text-3xl font-semibold mt-5 mb-5">
                {roomId}
            </h1>
            <p className="text-gray-600">This is the discussion room page.</p>
            <h2 className="text-xl sm:text-2xl font-semibold mt-5 mb-5">
                Galerie des images partagées dans le chat :
            </h2>
            <GalleryComponent functionManager={functionManager} type="chat-images"/>
            <h2 className="text-xl sm:text-2xl font-semibold mt-5 mb-5">
                Zone de discussion :
            </h2>
            <ChatComponent functionManager={functionManager}/>
            
        </div>
    )
}