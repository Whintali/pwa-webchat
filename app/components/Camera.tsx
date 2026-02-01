import { useRef, useEffect, useState} from "react";
import Swal from "sweetalert2";
import { sendNotification } from "../services/NotificationService";
import { sendVibration } from "../services/VibrationService";
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
                    const typeImages = (props.value && typeof props.value === "string")? props.value : "photos";
                    const stockImageTabNotConverted = window.localStorage.getItem(typeImages);
                    const stockImageTabConverted = stockImageTabNotConverted ? JSON.parse(stockImageTabNotConverted) : [];
                    stockImageTabConverted.push(data);
                    window.localStorage.setItem(typeImages, JSON.stringify(stockImageTabConverted));
                    Swal.fire({
                        title: 'Photo prise !',     
                        text: 'La photo a été prise avec succès.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    sendNotification("Photo prise avec succès !");
                    sendVibration(200);
                    props.functionManager?.reloadImages?.();
                    console.log("Photo prise et ajoutée !");
                }                
            }
        }
    useEffect(() => {
        let stream:MediaStream | undefined = undefined;
        
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                });
                
                stream = mediaStream;
                
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play();
                    setHasAuthorization(true);
                }
            } catch (err) {
                console.error("Erreur caméra : ", err);
                setHasAuthorization(false);
            }
        };
        startCamera();
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
        <div className="w-full aspect-video rounded-xl overflow-hidden relative bg-slate-900">
            <video
                ref={videoRef}
                className={`w-full h-full object-cover ${!hasAutorization ? 'hidden' : ''}`}
                autoPlay
                playsInline
                muted
            />

            {!hasAutorization && (
                <div className="w-full h-full flex items-center justify-center">
                    <p className="text-slate-500">Chargement de la caméra</p>
                </div>
            )}

            {type === "screenshot" && (
                <button
                    disabled={!hasAutorization}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 transition-all"
                    onClick={takePhoto}
                >
                    Prendre une photo
                </button>
            )}
        </div>
    );
}
      