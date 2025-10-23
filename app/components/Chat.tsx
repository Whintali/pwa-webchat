'use client';
import { useState } from "react";

export default function ChatComponent(props){
    
    const [room,setRoom] = useState({
        name: "Room 1",
    });
    const [messages,setMessages] = useState<string[]>([ "Bienvenue dans la discussion !" ]);

    props.functionManager = {};
    return( <div className="flex flex-col gap-2 p-4">
      <div className="border rounded p-2 h-48 overflow-y-auto bg-gray-50">
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Envoyer
        </button>
      </div>
    </div>
      )
}