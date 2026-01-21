'use client'
import { useState, useEffect } from "react";
import CameraComponent from "../components/Camera";
import GalleryComponent from "../components/Gallery";


      
export default function Page() {
    const [images,setImages] = useState<string[]>([]);
    useEffect(() => {   
        const photosNotConverted = window.localStorage.getItem("photos");
        setImages(prev => [ ...prev,...(photosNotConverted ? JSON.parse(photosNotConverted) : [])]);
    },[])
    useEffect(() => {   
        console.log(images)
    },[images])
    const functionManager: { reloadImages?: () => void } = {
        reloadImages: () => {}
    };
    
    return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-6">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-8">
      Prise de photos
    </h1>
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-10">
      <CameraComponent functionManager={functionManager}></CameraComponent>
    </div>
    <h2 className="text-xl font-semibold text-white mb-4">Choisir votre image personnelle :</h2>
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <GalleryComponent type="photos" images={images} functionManager={functionManager}></GalleryComponent>
    </div>
  </div>
</div>
    )
}