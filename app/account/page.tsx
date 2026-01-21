'use client'
import { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2";

export default function AccountPage() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState("");
    const [PersonnalImage, setPersonnalImage] = useState<string>("");
    useEffect(() => {
        if(localStorage.getItem("name")){
            setName(localStorage.getItem("name") || "");
        }
        if(localStorage.getItem("PersonnalImage") && typeof localStorage.getItem("PersonnalImage") === "string"){
            setPersonnalImage(localStorage.getItem("PersonnalImage") || "");
        }
    },[])
    useEffect(()=>{
        if(!name || !inputRef.current) return
        inputRef.current.value = name
    },[name])
    const handleClick = () => {
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
    return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-6">
  <div className="max-w-md mx-auto">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
        Mon compte
      </h1>
    </div>
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
      <img src={PersonnalImage} alt="Photo de profil" className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-violet-500/50 shadow-lg shadow-violet-500/20"/>
      <h2 className="text-slate-400 text-sm mt-6 mb-2">Mon nom :</h2>
      <input ref={inputRef} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all" type="text" placeholder="Entrez votre nom" />
      <button className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 hover:scale-[1.02] transition-all" type="submit" onClick={handleClick}>Enregistrer</button>
    </div>
  </div>
</div>)

}