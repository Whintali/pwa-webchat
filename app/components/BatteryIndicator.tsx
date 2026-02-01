"use client";
import { useState, useEffect } from "react";
import { watchBattery } from "../services/BatteryService";

export default function BatteryIndicator() {
    const [battery, setBattery] = useState<{ level: number; charging: boolean } | null>(null);

    useEffect(() => {
        let cleanup = () => {};

        watchBattery((info) => {
            setBattery(info);
        }).then((fn) => {
            cleanup = fn;
        });

        return () => cleanup();
    }, []);

    if (!battery) return null;

    return (
        <div className="flex items-center gap-1 text-sm">
            <span>{battery.charging ? "🔌" : "🔋"}</span>
            <span>{battery.level}%</span>
        </div>
    );
}