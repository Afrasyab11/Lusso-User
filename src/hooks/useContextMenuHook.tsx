import { useEffect } from "react";


const useContextMenuHook = () => {
    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
            // alert("Right-click is disabled on this page.");
        };

        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);
};

export default useContextMenuHook;