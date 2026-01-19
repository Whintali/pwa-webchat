'use client';
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import socket from "../../socket-client";

type Message = {
    id: string;
    sender: string;
    senderId: string;
    content: string;
    timestamp: Date;
}

type ChatProps = {
    room: string;
}

export default function ChatComponent({ room }: ChatProps) {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [username, setUsername] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [participants, setParticipants] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const [userId] = useState(() => {
        if (typeof window === 'undefined') return crypto.randomUUID();
        return localStorage.getItem('chatUserId') || (() => {
            const newId = crypto.randomUUID();
            localStorage.setItem('chatUserId', newId);
            return newId;
        })();
    });

    useEffect(() => {
        const storedName = localStorage.getItem("name");
        if (storedName) {
            setUsername(storedName);
        } else {
            router.push('/account');
        }
    }, [router]);

    useEffect(() => {
        if (!room || !username) return;

        socket.connect();

        const onConnect = () => {
            console.log("Connecté au serveur Socket.IO");
            setIsConnected(true);
            
            socket.emit("join_room", { 
                room: room,
                username: username,
                userId: userId
            });
        };

        const onDisconnect = () => {
            console.log("Déconnecté du serveur");
            setIsConnected(false);
        };

        const onMessage = (data: any) => {
            console.log("Message reçu:", data);
            
            if (data.userId === userId) return;
            
            const newMessage: Message = {
                id: data.id || crypto.randomUUID(),
                sender: data.username || data.sender || "Inconnu",
                senderId: data.userId || data.senderId || "",
                content: data.message || data.content,
                timestamp: new Date(data.timestamp || Date.now()),
            };
            setMessages(prev => [...prev, newMessage]);
        };

        const onRoomInfo = (data: any) => {
            console.log("Info room:", data);
            if (data.participants) {
                setParticipants(data.participants);
            }
        };

        socket.onAny((eventName, ...args) => {
            console.log("📨 Event:", eventName, args);
        });

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("message", onMessage);
        socket.on("receive_message", onMessage);
        socket.on("chat_message", onMessage);
        socket.on("room_info", onRoomInfo);

        if (socket.connected) {
            onConnect();
        }

        return () => {
            socket.emit("leave_room", { room: room, userId: userId });
            socket.offAny();
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("message", onMessage);
            socket.off("receive_message", onMessage);
            socket.off("chat_message", onMessage);
            socket.off("room_info", onRoomInfo);
            socket.disconnect();
        };
    }, [room, username, userId]);

    const sendMessage = () => {
        if (!inputMessage.trim() || !isConnected) return;

        const messageData = {
            room: room,
            message: inputMessage,
            username: username,
            userId: userId,
            timestamp: new Date().toISOString(),
        };

        socket.emit("send_message", messageData);

        const newMessage: Message = {
            id: crypto.randomUUID(),
            sender: username,
            senderId: userId,
            content: inputMessage,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, newMessage]);
        setInputMessage("");
    };

    if (!username) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Chargement...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full max-h-screen w-full bg-gray-100">
            {/* Header */}
            <div className="bg-indigo-600 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => router.push('/discussion')}
                        className="hover:bg-indigo-700 p-1 rounded"
                    >
                        ← Retour
                    </button>
                    <h2 className="text-lg font-semibold">{room}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></span>
                    <span className="text-sm opacity-80">
                        {isConnected ? `${participants} participants` : 'Connexion...'}
                    </span>
                </div>
            </div>

            {/* Info utilisateur */}
            <div className="bg-indigo-100 px-4 py-2 text-sm text-indigo-700">
                Connecté en tant que <strong>{username}</strong>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                    <p className="text-center text-gray-500">
                        Aucun message. Commencez la conversation !
                    </p>
                )}
                
                {messages.map((msg) => {
                    const isMe = msg.senderId === userId;
                    
                    return isMe ? (
                        <div key={msg.id} className="flex items-start justify-end space-x-3">
                            <div className="bg-indigo-500 text-white p-3 rounded-xl shadow max-w-xs">
                                <p className="text-sm">{msg.content}</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-indigo-400 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                                {username.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    ) : (
                        <div key={msg.id} className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                                {msg.sender.charAt(0).toUpperCase()}
                            </div>
                            <div className="bg-white p-3 rounded-xl shadow max-w-xs">
                                <p className="text-xs font-semibold text-indigo-600 mb-1">{msg.sender}</p>
                                <p className="text-sm text-gray-800">{msg.content}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center p-3 border-t border-gray-300 bg-white">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={isConnected ? "Tapez un message..." : "Connexion en cours..."}
                    disabled={!isConnected}
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100"
                />
                <button 
                    onClick={sendMessage}
                    disabled={!isConnected || !inputMessage.trim()}
                    className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
}