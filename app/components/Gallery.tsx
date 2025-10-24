import { useEffect, useState} from "react";
import Swal from "sweetalert2";


export default function GalleryComponent(props:Props) {
    const type = props.type
    const [images,setImages] = useState<string[]>([]);
    props.functionManager.reloadImages = () => {
        const photosNotConverted = window.localStorage.getItem(type);
        setImages([]);
        setImages(prev => [ ...prev,...(photosNotConverted ? JSON.parse(photosNotConverted) : [])]);       
    }
    let onClick = (index) => {console.log(index)}
    useEffect(()=>{         
            const photosNotConverted = window.localStorage.getItem(type);
            setImages(prev => [ ...prev,...(photosNotConverted ? JSON.parse(photosNotConverted) : [])]);   
    },[])
    switch(type){
        case "photos": {         
            onClick = (index) => {
                window.localStorage.setItem("PersonnalImage",images[index])
                console.log(index)
                Swal.fire({
                            title: 'Photo choisie !',     
                            text: 'Vous avez changé de photo de profil.',
                            icon: 'success'
                });
            }
            console.log(images)
        }
        default : {}
    }
    const clearImages = () => {
            window.localStorage.removeItem(type);   
            Swal.fire({
                icon: 'success',
                title: 'Images supprimées !',
                text: 'Les images ont été supprimées avec succès.',
                showConfirmButton: true,
                timer: 1500
            })
            props.functionManager.reloadImages();
            if(type === "photos"){
                window.localStorage.removeItem("PersonnalImage");
            }
        }

    return (
        <div>
            { images.length > 0 &&
            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700" onClick={()=>{ clearImages() }}> Clear Images</button>
            }
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {   
                    images.map((image,index)=>
                    <div key={index} className="bg-gray-200 rounded-lg aspect-square shadow hover:scale-105 hover:shadow-lg transition-transform"><img onClick={() => onClick(index)} src={image}></img></div>
                )
            }
            </div>
            
        </div>
        );
}
