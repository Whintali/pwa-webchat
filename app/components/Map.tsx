import { AdvancedMarker, APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { cpSync } from "fs";
import { useRef, useEffect} from "react";
import Swal from "sweetalert2";
export default function MapComponent(props:Props) {
    const map = useRef<google.maps.Map>(null);
    useEffect(() => {
        if(!props.value || !map.current)return;
        if(map.current && props.value && props.value instanceof GeolocationCoordinates){
            map.current.setCenter({lat: props.value.latitude, lng: props.value.longitude});
            new google.maps.Marker({  // Deprecated but the alternative AdvancedMarkerElement depends on a Map Id and I don't want to use it
                position: {lat: props.value.latitude, lng: props.value.longitude},
                map: map.current,
                title: "Vous êtes ici !"
            });
        }
    }, [props.value,map]);

    return ( 
        <div className="w-50 sm:w-3/4 lg:w-2/3 aspect-video rounded-lg shadow-lg overflow-hidden relative">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}>
            <Map
                style={{width: '100%', height: '100%'}}
                defaultCenter={{lat: 22.54992, lng: 0}}
                defaultZoom={15}
                gestureHandling='greedy'
                disableDefaultUI
                onIdle={(event)=> {
                    map.current = event.map;
                }}>
            </Map>
            </APIProvider>
        </div>    
    )
}
      