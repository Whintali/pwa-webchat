import { useRef, useEffect, useState} from "react";
import { start } from "repl";
import Swal from "sweetalert2";
export default function CameraComponent(props:Props) {
    const [hasAutorization, setHasAuthorization] = useState<boolean>(false);
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
                    props.functionManager?.reloadImages?.();
                    console.log("Photo prise et ajoutée !");
                }                
            }
        }
    useEffect(() => {
        let stream:MediaStream | undefined = undefined;
        try{
                navigator.mediaDevices.getUserMedia({video: true, audio: false}).then((mediaStream) => {
                    stream = mediaStream;
                    if(stream) { 
                        setHasAuthorization(true); 
                        startCamera();
                    }
                }).catch((err) => {
                    console.error("Erreur d'accès à la caméra : ", err);
                });
                const startCamera = () => {
                    if (videoRef.current && stream) {
                        videoRef.current.srcObject = stream;
                    }
                }
            }
            catch(err){
                console.error("Erreur lors de la tentative d'accès à la caméra : ", err);
            }
                return () => {
                    if(stream && stream.active){
                        stream.getTracks().forEach(track => track.stop());
                        stream = undefined;
                    }
                    if(videoRef.current){
                        videoRef.current.srcObject = null;
                    }
                }
    }, []);   
    return ( 
        <div className="w-full sm:w-3/4 lg:w-2/3 aspect-video rounded-lg shadow-lg overflow-hidden relative">
            {hasAutorization &&
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted></video>}
            {!hasAutorization &&
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <p className="text-gray-500">Autorisation de la caméra refusée.</p>
                </div>}   
            {type == "screenshot" && <button disabled={!hasAutorization} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700" onClick={() => takePhoto()}>Prendre une photo</button>}
        
        </div>    
    )
}
      