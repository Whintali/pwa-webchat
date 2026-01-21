'use client'
import { useState, useEffect } from "react";
import CameraComponent from "../components/Camera";
import GalleryComponent from "../components/Gallery";
import MapComponent from "../components/Map";


      
export default function Page() {
    const [geolocalisation,setGeolocalisation] = useState<GeolocationCoordinates>();
    useEffect(() => {   
            navigator.geolocation.getCurrentPosition((position) => {
                setGeolocalisation(position.coords);
            }
            )
    },[])
    
    return (
   <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-6">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-8">
      Géolocalisation
    </h1>
    <div className="flex justify-center gap-8 mb-8 text-slate-300">
      <span>Latitude : <span className="font-mono text-white">{geolocalisation?.latitude}</span></span>
      <span>Longitude : <span className="font-mono text-white">{geolocalisation?.longitude}</span></span>
    </div>
    <div className="bg-white/5 border border-white/10 rounded-2xl p-2">
      <MapComponent value={geolocalisation}></MapComponent>
    </div>
  </div>
</div>
    )
}