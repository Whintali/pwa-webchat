"use client"
import socket from "@/socket-client";
import Link from "next/link";
import {usePathname} from "next/navigation"

    export default function NavBarComponent() {
      const pathname = usePathname();
      console.log("Current pathname:", pathname);
      if (socket.connected && !pathname.includes("/discussion")) {
        socket.disconnect();
        console.log("Socket disconnected from Navbar");
      }
    return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-black">PWA App</div>

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