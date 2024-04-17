import { RefObject, useEffect, useState } from "react";

function useVisible(ref: RefObject<Element>, rootMargin = "0px") {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentRef = ref.current;

        if (currentRef === null) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin }
        )

        observer.observe(currentRef);

        return () => {
            if (currentRef == null) {
                return;
            }

            observer.unobserve(currentRef);
        }
    }, [ref, rootMargin]);

    return isVisible;
}

export default useVisible;