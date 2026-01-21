import Swal from "sweetalert2";

async function requestNotificationPermission () {
    if (!("Notification" in window)) {
        console.log("Ce navigateur ne supporte pas les notifications");
        return false;
    }
    
    const permission = await Notification.requestPermission();
    return permission === "granted";
};

async function sendNotification (title: string, options?: NotificationOptions) {
    if (Notification.permission === "granted") {
        const notification = new Notification(title, options);
        
        setTimeout(() => notification.close(), 5000);
        notification.onclick = () => {
            window.focus();
            notification.close();
        };
    }
};

export { requestNotificationPermission, sendNotification };