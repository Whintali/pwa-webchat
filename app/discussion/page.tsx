'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"


export default function DiscussionPage(){
    const router = useRouter();
    const [rooms,setRooms] = useState([{
        name: "Room 1",
    },{
        name: "Room 2",
    }])
    const [selectedRoom,setSelectedRoom] = useState({});
    useEffect(()=>{}
    ,[])
    useEffect(()=>{
        if(JSON.stringify(selectedRoom) === "{}" || !selectedRoom.name) return
        router.push(`/discussion/${selectedRoom.name.toLowerCase().replace(" ","-")}`);
    },[selectedRoom])
    
    return (
    <div className="w-full flex flex-col items-center">
    <h1 className="text-2xl sm:text-3xl font-semibold mt-5 mb-5">
      Conversations
    </h1>
    {rooms.length > 0 && (
      <button className="mb-5 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Clear Rooms
      </button>
    )}

    <div className="ml-5 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {rooms.map((room, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg aspect-square shadow hover:scale-105 hover:shadow-lg transition-transform flex flex-col items-center justify-center"
            onClick={() => setSelectedRoom(room)}
        >
          <div className="w-full text-center p-2 text-gray-700 font-medium bg-white rounded-b-lg">
            {room.name}
          </div>
        </div>
      ))}
    </div>
  </div>)
} 