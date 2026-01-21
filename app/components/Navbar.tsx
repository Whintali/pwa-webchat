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
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <div className="text-2xl font-bold text-black"><Link href="/" className="text-gray-700 hover:text-indigo-600">
            PWA App
          </Link></div>

        <div className="flex space-x-6">
          <Link href="/account" className="text-gray-700 hover:text-indigo-600">
            Mon compte
          </Link>
          <Link href="/photo" className="text-gray-700 hover:text-indigo-600">
            Photos
          </Link>
          <Link href="/discussion" className="text-gray-700 hover:text-indigo-600">
            Conversation
          </Link>
          <Link href="/geolocalise" className="text-gray-700 hover:text-indigo-600">
            Geolocalisation
          </Link>
        </div>
      </div>
    </nav>
    )
}