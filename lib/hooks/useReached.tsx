import { RefObject, useEffect, useState } from "react";
import useVisible from "./useVisible";

function useReached(ref: RefObject<Element>, rootMargin = "0px") {
    const [reached, setReached] = useState(false);
    const [mounted, setMounted] = useState(false);
    const isVisible = useVisible(ref, rootMargin);

    useEffect(() => {
        setMounted(true);

        if (mounted) {
            setTimeout(() => {
                if (isVisible && reached === false) {
                    setReached(true);
                }
            }, 0);
        }

        return () => {
            setMounted(false);
        }
    }, [isVisible]);

    return reached;
}

export default useReached;