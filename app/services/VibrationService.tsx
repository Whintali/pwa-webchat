
function sendVibration (options?: VibratePattern | undefined) {
    if (("vibrate" in navigator)) {
        if (options) {
            navigator.vibrate(options);
        }
        else{
            navigator.vibrate(100);
        }
    }
    
};
export { sendVibration };