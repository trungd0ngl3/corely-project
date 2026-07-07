import { useState, useEffect, useRef } from "react";

export function useCartAnimation(cartCount: number) {
    const [animate, setAnimate] = useState(false);
    const prevCountRef = useRef(cartCount);

    useEffect(() => {
        if (cartCount > prevCountRef.current) {
            setAnimate(true);
            const timer = setTimeout(() => {
                setAnimate(false);
            }, 300); // 300ms matches standard transition duration
            return () => clearTimeout(timer);
        }
        prevCountRef.current = cartCount;
    }, [cartCount]);

    return { animate };
}