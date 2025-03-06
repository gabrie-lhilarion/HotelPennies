import { useState, useEffect } from "react";

const InstallButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault(); // Prevent default browser behavior
            setDeferredPrompt(event);
            setShowButton(true); // Show the install button
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show the install prompt

            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                } else {
                    console.log("User dismissed the install prompt");
                }
                setDeferredPrompt(null);
                setShowButton(false);
            });
        }
    };

    return (
        <>
            {showButton && (
                <button onClick={handleInstallClick} style={{ padding: "10px", fontSize: "16px" }}>
                    Install App
                </button>
            )}
        </>
    );
};

export default InstallButton;
