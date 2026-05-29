import { useRef, useCallback } from 'react';

// Mantém a mesma referência da função debounced entre renderse garante que o timeout seja limpo corretamente.
export default function useDebounce(func, delay) {
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  }, [func, delay]);
}
