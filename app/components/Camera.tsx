import { useRef, useEffect} from "react";
import Swal from "sweetalert2";
export default function CameraComponent(props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const type = props.type || "screenshot";
    const takePhoto = () => {if (videoRef.current) {
                const canvas = document.createElement("canvas");
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                const context = canvas.getContext("2d");
                if(context){
                    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                    const data = canvas.toDataURL("image/jpeg",0.5);
                    const stockImageTabNotConverted = window.localStorage.getItem("photos");
                    const stockImageTabConverted = stockImageTabNotConverted ? JSON.parse(stockImageTabNotConverted) : [];
                    stockImageTabConverted.push(data);
                    window.localStorage.setItem("photos", JSON.stringify(stockImageTabConverted));
                    Swal.fire({
                        title: 'Photo prise !',     
                        text: 'La photo a été prise avec succès.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    props.functionManager.reloadImages();
                    console.log("Photo prise et ajoutée !");
                }                
            }
        }
    useEffect(() => {
        const startCamera = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        }
        startCamera(); 
    }, []);   
    return ( 
        <div className="w-full sm:w-3/4 lg:w-2/3 aspect-video rounded-lg shadow-lg overflow-hidden relative">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted></video>    
            {type == "screenshot" && <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700" onClick={() => takePhoto()}>Prendre une photo</button>}    
        </div>    
    )
}
      