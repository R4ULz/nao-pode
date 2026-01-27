import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(
  initialSeconds: number,
  options?: {
    autoStart?: boolean;
    onFinish?: () => void;
  }
) {
  const autoStart = options?.autoStart ?? false;
  const onFinish = options?.onFinish;

  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  const finishedRef = useRef(false);

  const start = useCallback(() => {
    finishedRef.current = false;
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (seconds = initialSeconds) => {
      finishedRef.current = false;
      setSecondsLeft(seconds);
      setIsRunning(autoStart);
    },
    [initialSeconds, autoStart]
  );

  useEffect(() => {
    if (!isRunning) return;

    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setIsRunning(false);

          if (!finishedRef.current) {
            finishedRef.current = true;
            onFinish?.();
          }

          return 0;
        }

        return s - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [isRunning, onFinish]);

  return { secondsLeft, isRunning, start, pause, reset };
}