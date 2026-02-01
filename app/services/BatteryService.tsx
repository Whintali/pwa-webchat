export async function getBatteryInfo() {
    if (!('getBattery' in navigator)) {
        return null;
    }

    const battery = await (navigator as any).getBattery();
    
    return {
        level: Math.round(battery.level * 100),
        charging: battery.charging
    };
}

export async function watchBattery(callback: (info: { level: number; charging: boolean }) => void) {
    if (!('getBattery' in navigator)) {
        return () => {};
    }

    const battery = await (navigator as any).getBattery();

    const update = () => {
        callback({
            level: Math.round(battery.level * 100),
            charging: battery.charging
        });
    };

    update();

    battery.addEventListener('levelchange', update);
    battery.addEventListener('chargingchange', update);

    return () => {
        battery.removeEventListener('levelchange', update);
        battery.removeEventListener('chargingchange', update);
    };
}