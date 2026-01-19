'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import socket from "../../socket-client";

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
        router.push(`/discussion/${selectedRoom.toLowerCase().replace(" ","-")}`);
    },[selectedRoom])
    
    return (
    <div className="w-full flex flex-col items-center">
    <h1 className="text-2xl sm:text-3xl font-semibold mt-5 mb-5">
      Conversations
    </h1>
     
      <button className="mb-5 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Reload Rooms
      </button>

    <div className="ml-5 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {rooms.map((room, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg aspect-square shadow hover:scale-105 hover:shadow-lg transition-transform flex flex-col items-center justify-center"
            onClick={() => setSelectedRoom(room)}
        >
          <div className="w-full text-center p-2 text-gray-700 font-medium bg-white rounded-b-lg">
            {room}
          </div>
        </div>
      ))}
    </div>
  </div>)
} 

async function fetchRooms() {
  try{
  const response = await fetch(`https://api.tools.gavago.fr/socketio/api/rooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resultData = await response.json();
  console.log(resultData);
  return resultData;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return {data:{}};
  }
}