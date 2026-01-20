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
    <div className="mt-5 flex flex-col items-center p-4 space-y-6 w-3/4 mx-auto">
        <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold">
                Page de Géolocalisation !
            </h1>
        </div>
        <h1>latitude : {geolocalisation?.latitude}, longitude : {geolocalisation?.longitude} </h1>
        <MapComponent value={geolocalisation}></MapComponent>
    </div>
    )
}