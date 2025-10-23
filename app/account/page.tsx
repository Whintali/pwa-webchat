'use client'
import { use, useEffect, useRef, useState } from "react"
import Swal from "sweetalert2";
import GalleryComponent from "../components/Gallery";

export default function AccountPage() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState("");
    const [images, setImages] = useState<string[]>([]);
    useEffect(() => {
        if(localStorage.getItem("name")){
            setName(localStorage.getItem("name") || "");
        }
        const photosNotConverted = window.localStorage.getItem("photos");
        setImages(prev => [ ...prev,...(photosNotConverted ? JSON.parse(photosNotConverted) : [])]);
        /// Formulaire à faire input image + nom
    },[])
    useEffect(()=>{
        if(!name || !inputRef.current) return
        inputRef.current.value = name
    },[name])
    const handleClick = (e) => {
        setName(inputRef.current?.value || "");
        localStorage.setItem("name", inputRef.current?.value || "");
        Swal.fire({
                        icon: 'success',
                        title: 'Profil enregistré !',
                        text: 'Le profil a été mis à jour avec succès.',
                        showConfirmButton: true,
                        timer: 1500
                    })
    }
    const functionManager: { reloadImages?: () => void } = {
        reloadImages: () => {}
    };
    return (
    <div className="mt-5 flex flex-col items-center p-4 space-y-6 w-3/4 mx-auto">
        <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold">
                Mon compte
            </h1>
            <h2 className=""> Mon nom :</h2>
            <input ref={inputRef} className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs" type="text" placeholder="Entrez votre nom" />
            <GalleryComponent type="photos" images={images} functionManager={functionManager}></GalleryComponent>
            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded" type="submit" onClick={handleClick}>Enregistrer </button>
        </div>
        <div>
            
        </div>

    </div>)

}