"use client";

import { io } from "socket.io-client";


const socket = io("https://api.tools.gavago.fr/socketio/:4000", {
  transports: ["websocket"],    
});

export default socket;
