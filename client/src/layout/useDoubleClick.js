import { useState, useRef, useCallback, useEffect } from 'react';

const useDoubleClick = callback => {
  const [elem, setElem] = useState(null);
  const countRef = useRef(0);
  const timerRef = useRef(null);
  const inputCallbackRef = useRef(null);
  const callbackRef = useCallback(node => {
    setElem(node);
    callbackRef.current = node;
  }, []);

  useEffect(() => {
    inputCallbackRef.current = callback;
  });

  useEffect(() => {
    const handler = () => {
      const isDoubleClick = countRef.current + 1 === 2;
      const timerIsPresent = timerRef.current;
      if (timerIsPresent && isDoubleClick) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        countRef.current = 0;
        if (inputCallbackRef.current) {
          inputCallbackRef.current();
        }
      }
      if (!timerIsPresent) {
        countRef.current = countRef.current + 1;
        timerRef.current = setTimeout(() => {
          clearTimeout(timerRef.current);
          timerRef.current = null;
          countRef.current = 0;
        }, 300);
      }
    }
    if (elem) {
      elem.addEventListener("click", handler);
    }

    return () => {
      if (elem) {
        elem.removeEventListener("click", handler);
      }
    };
  }, [elem]);

  return [callbackRef, elem];
};

export default useDoubleClick;
