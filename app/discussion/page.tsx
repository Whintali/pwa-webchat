'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import socket from "../../socket-client";
import { fetchRooms } from "../services/SocketIOService";

type room = {
    name: string;
    numberOfParticipants: number;
}

export default function DiscussionPage(){
    const router = useRouter();
    const [rooms,setRooms] = useState<string[]>([])
    const [selectedRoom,setSelectedRoom] = useState("");
    useEffect(()=>{
      socket.connect();
      fetchRooms().then((resultData)=>{
        setRooms(prev=>[...Object.keys(resultData.data)]); // Modifier le json retourné pour qu'il ressemble à une liste d'objet Room (voir comment je structure l'objet)
        console.log(Object.keys(resultData.data));
      });
    }
    ,[])
    useEffect(()=>{
        if(!selectedRoom) return
        router.push(`/discussion/${selectedRoom.replace(" ","-")}`);
    },[selectedRoom])
    
    return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-6">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-8">
      Conversations
    </h1>
    <div className="flex justify-center mb-8">
      <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all">
        Reload Rooms
      </button>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {rooms.map((room, index) => (
        <div key={index} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium text-center cursor-pointer hover:bg-white/10 hover:border-violet-500/30 hover:scale-[1.02] transition-all" onClick={() => setSelectedRoom(room)}>
          {room}
        </div>
      ))}
    </div>
  </div>
</div>)
} 

