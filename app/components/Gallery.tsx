import { useEffect, useState} from "react";
import Swal from "sweetalert2";


export default function GalleryComponent(props:Props) {
    const type = props.type
    const [images,setImages] = useState<string[]>([]);
    if(props.functionManager) {
        props.functionManager.reloadImages = () => {
            const photosNotConverted = window.localStorage.getItem(type? type : "");
            setImages([]);
            setImages(prev => [ ...prev,...(photosNotConverted ? JSON.parse(photosNotConverted) : [])]);       
        }
    }
    let onClick = (index:number) => {console.log(index)}
    useEffect(()=>{         
            const photosNotConverted = window.localStorage.getItem(type? type : "");
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
            window.localStorage.removeItem(type? type : "");   
            Swal.fire({
                icon: 'success',
                title: 'Images supprimées !',
                text: 'Les images ont été supprimées avec succès.',
                showConfirmButton: true,
                timer: 1500
            })
            props.functionManager?.reloadImages?.();
            if(type === "photos"){
                window.localStorage.removeItem("PersonnalImage");
            }
        }

    return (
        <div>
  {images.length > 0 &&
    <button className="mb-4 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all" onClick={() => clearImages()}>Clear Images</button>
  }
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {images.map((image, index) =>
      <div key={index} className="aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-violet-500/30 hover:scale-[1.02] transition-all cursor-pointer">
        <img onClick={() => onClick(index)} src={image} className="w-full h-full object-cover"/>
      </div>
    )}
  </div>
</div>
        );
}
