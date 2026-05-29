import { useRef, useCallback } from 'react';

// Hook de debounce para evitar chamadas excessivas durante a digitação
export default function useDebounce(func, delay) {
    const timeoutRef = useRef(null);

    // Retorna uma função memoizada que implementa o debounce
    return useCallback((...args) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            func(...args);
        }, delay);
    }, [func, delay]);
} 