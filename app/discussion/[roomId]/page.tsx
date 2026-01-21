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
        <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-6">
  <div className="max-w-5xl mx-auto">
    <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2">
      {roomId}
    </h1>
    <p className="text-slate-500 text-center mb-10">Discussion room</p>
    
    <h2 className="text-xl font-semibold text-white mb-4">Galerie des images partagées :</h2>
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
      <GalleryComponent functionManager={functionManager} type="chat-images"/>
    </div>
    
    <h2 className="text-xl font-semibold text-white mb-4">Zone de discussion :</h2>
    <ChatComponent functionManager={functionManager}/>
  </div>
</div>
    )
}