'use client';
import { useEffect, useState,useRef, use } from "react";
import { useParams, useRouter } from "next/navigation";
import socket from "../../socket-client";
import { postImageMessage,getImageMessage } from "../services/SocketIOService";
import { json } from "stream/consumers";
import { get } from "http";
import { sendNotification } from "../services/NotificationService";

type Message = {
    sender: string;
    content?: string;
    dateSent: Date;
    category: string;
    image?: string;
}


// Gérer la gestion du chat
// Message trié selon l'utilisateur (moi / autre) via id utilisateur (objet [id] : {username:"",room:""})
export default function ChatComponent(props:Props) {
    const router = useRouter();
    const {roomId} = useParams();
    const [messages,setMessages] = useState<Message[]>([]);
    const userIdRef = useRef<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const username = useRef<string>("");
    const messageDivRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        sendImage(file);
      }
    }
    if (!roomId && roomId ==="") {
      router.push("/discussion/");
    }
    const onConnect = (username:string) => {
      socket.on('connect', () => {
        console.log('Connected to socket.io server');
        socket.emit('chat-join-room', { pseudo: username, roomName: roomId });  
      });
    };
    const joinRoom = (username:string) => {
        socket.emit('chat-join-room', { pseudo: username, roomName: roomId });
        console.log("Re-joined room:", roomId);
    }
    const receiveAllMessage = () => {
      socket.on("chat-msg", (msg) => {
        msg.dateEmis = new Date(msg.dateEmis);
        console.log("4", JSON.stringify(msg));
        if(msg.categorie === "NEW_IMAGE"){
          console.log("Image reçue: ", JSON.stringify(msg.id_image));
          getImageMessage(msg.id_image).then((data_image)=>{
            console.log("Image data reçue: ", data_image);
            const content = msg.content.slice(0,-1).split(" ")
            setMessages(prev => [...prev, {
              sender: content[content.length - 1],
              content: msg.content,
              dateSent: msg.dateEmis,
              category: "IMAGE",
              image: data_image || ""
            }]); 
            const storedImagesNotConverted = window.localStorage.getItem("chat-images");
            const storedImages = (storedImagesNotConverted) ? JSON.parse(storedImagesNotConverted as string) : [];
            storedImages.push(data_image);
            localStorage.setItem("chat-images", JSON.stringify(storedImages));
            props.functionManager?.reloadImages?.();
          });
        }
        else {setMessages(prev => [...prev, {
          sender: msg.pseudo,
          content: msg.content,
          dateSent: msg.dateEmis,
          category: msg.categorie
        }]);}
        if(username != msg.pseudo && msg.categorie != "INFO") sendNotification(`Nouveau message reçu de ${msg.pseudo}`);
      });
      /*
      socket.on("image-sended", (msg) => {
        msg.dateEmis = new Date(msg.dateEmis);
        console.log("Image reçue: ", JSON.stringify(msg));
        setMessages(prev => [...prev, {
          sender: msg.pseudo,
          content: msg.content,
          dateSent: msg.dateEmis,
          category: msg.categorie,
          image: msg.image
        }]);
        const storedImagesNotConverted = window.localStorage.getItem("chat-images");
        const storedImages = (storedImagesNotConverted) ? JSON.parse(storedImagesNotConverted as string) : [];
        storedImages.push(msg.image);
        localStorage.setItem("chat-images", JSON.stringify(storedImages));
        props.functionManager?.reloadImages?.();
      });   
      */  
    }
    const retrieveUserId = (username:string) => {
      socket.on("chat-joined-room", (data) => {
        let indexFromTheEnd = Object.values(data.clients).length-1;
        for(let i=0;i<Object.values(data.clients).length;i++){
          const pseudo = (Object.values(data.clients).at(-1) as { pseudo: string })?.pseudo;
          if(pseudo === username){
            userIdRef.current = Object.keys(data.clients)[indexFromTheEnd];
            socket.off("chat-joined-room");
            break;
          }
          indexFromTheEnd--;
        }
      });
    }
    const sendMessage = (messageContent:string) => {
      socket.emit("chat-msg", { content : messageContent,roomName:roomId,});
    }
    const sendImage = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => { 
          const img = new Image();
          img.onload = () => {
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;
            const quality = 0.5; 
            if (width > height) {
              if (width > MAX_WIDTH) {
                height = Math.round((height *= MAX_WIDTH / width));
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width = Math.round((width *= MAX_HEIGHT / height));
                height = MAX_HEIGHT;
              }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
          postImageMessage(compressedBase64,roomId as string);
        }
      }
          img.src = reader.result as string;
        };
        reader.readAsDataURL(file);
    };
    useEffect(() => {
      username.current = window.localStorage.getItem("name") || "Anonyme";
      console.log("ChatComponent mounted for room: ", roomId);

      if(socket.connected === false){
        socket.connect();
        joinRoom(username.current);
      }
      else {
        joinRoom(username.current);
      }
      receiveAllMessage();
      retrieveUserId(username.current);
      socket.on("error", (error) => {
        console.error("Erreur de connexion:", error.message);
        sendNotification(`Erreur : ${error.message}`);
      });   
      
      return () => {
        socket.emit('chat-leave-room', { pseudo:username,roomName: roomId });
        socket.off('connect');
        socket.off('chat-msg');
        socket.off('chat-joined-room');
        socket.off('error');
        socket.disconnect()
      }
    }, []);
    useEffect(() => {messageDivRef.current?.scrollIntoView({behavior: 'auto'})}, [messages]);
   return (
  <div className="flex flex-col h-full max-h-screen w-full bg-gray-100">
    {/* Header */}
    <div className="bg-indigo-600 text-white px-4 py-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold"></h2>
      <span className="text-sm opacity-80">5 participants</span>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.length !== 0 && messages.map((message, index) => (
        <div key={index}>
          {message.sender === username.current ? (
              // Message envoyé par moi
              <div className="flex items-start justify-end space-x-3">
                  <div className="bg-indigo-500 text-white p-3 rounded-xl shadow max-w-xs">
                      {message.category === "IMAGE" ? (
                          <img src={message.image} alt="Image" className="max-w-full rounded-lg" />
                      ) : (
                          <p className="text-sm">{message.content}</p>
                      )}
                      <span className="text-xs opacity-70 font-semibold">{message.sender} </span>
                      <span className="text-xs opacity-70">{message.dateSent.toLocaleTimeString()}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-indigo-400 flex-shrink-0"></div>
              </div>
          ) : message.category === "IMAGE" ? (
              // Image reçue d'un autre utilisateur
              <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0"></div>
                  <div className="bg-white p-3 rounded-xl shadow max-w-xs">
                      <img src={message.image} alt="Image" className="max-w-full rounded-lg" />
                      <span className="text-xs text-indigo-600 font-semibold">{message.sender} </span>
                      <span className="text-xs text-gray-400">{message.dateSent.toLocaleTimeString()}</span>
                  </div>
              </div>
          ) : message.category === "INFO" || message.category === "NEW_IMAGE" ? (
              // Système, notification, etc.
              <div className="flex justify-center">
                  <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm italic">
                      {message.content}
                  </div>
              </div>
          ) : (
              // Message reçu d'un autre utilisateur
              <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0"></div>
                  <div className="bg-white p-3 rounded-xl shadow max-w-xs">
                      <p className="text-sm text-gray-800">{message.content}</p>
                      <span className="text-xs text-indigo-600 font-semibold">{message.sender} </span>
                      <span className="text-xs text-gray-400">{message.dateSent.toLocaleTimeString()}</span>
                  </div>
              </div>
          )}
        </div>
      ))}
      <div ref={messageDivRef}></div>
    </div>

    <div className="flex items-center p-3 border-t border-gray-300 bg-white">
      <input
        ref={inputRef}
        onKeyUp={(e)=> {if(inputRef.current?.value != null && e.key === "Enter"){ sendMessage(inputRef.current?.value); inputRef.current.value="";}}}
        type="text"
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button onClick={() => fileInputRef.current?.click()} className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700"> 
        Image
      </button>
      <button onClick={()=> {if(inputRef.current?.value != null){ sendMessage(inputRef.current?.value); inputRef.current.value = "";}}} className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700">
        Envoyer
      </button>
    </div>
  </div>
);
}