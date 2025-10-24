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
    <div className="mt-5 flex flex-col items-center p-4 space-y-6 w-3/4 mx-auto">
        <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold">
                Page de prise de photos !
            </h1>
        </div>
        <CameraComponent functionManager={functionManager}></CameraComponent>
        <h2>Choisir votre image personnelle :</h2>
        <GalleryComponent type="photos" images={images} functionManager={functionManager}></GalleryComponent>
    </div>
    )
}