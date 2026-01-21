"use client"
import socket from "@/socket-client";
import Link from "next/link";
import {usePathname} from "next/navigation"
import { use, useEffect } from "react";
import { requestNotificationPermission } from "../services/NotificationService";
import Swal from "sweetalert2";

    export default function NavBarComponent() {
      const pathname = usePathname();
      console.log("Current pathname:", pathname);
      if (socket.connected && !pathname.includes("/discussion")) {
        socket.disconnect();
        console.log("Socket disconnected from Navbar");
      }
      useEffect(() => {
          if(!navigator.permissions.query.toString().includes("Notification")){
            requestNotificationPermission()
          }
        }, []);
    return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    <div className="text-2xl font-bold">
      <Link href="/" className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent hover:from-violet-400 hover:to-fuchsia-400 transition-all">
        PWA App
      </Link>
    </div>
    <div className="flex items-center gap-1">
      <Link href="/account" className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
        Mon compte
      </Link>
      <Link href="/photo" className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
        Photos
      </Link>
      <Link href="/discussion" className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
        Conversation
      </Link>
      <Link href="/geolocalise" className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
        Geolocalisation
      </Link>
    </div>
  </div>
</nav>
    )
}