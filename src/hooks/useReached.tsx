import { RefObject, useEffect, useState } from "react";
import useVisible from "./useVisible";

function useReached(ref: RefObject<Element>, rootMargin = "0px") {
    const isVisible = useVisible(ref, rootMargin);
    const [reached, setReached] = useState(false);

    useEffect(() => {
        if (isVisible === true) {
            setReached(true);
        }
    }, [isVisible]);

    return reached;
}

export default useReached;