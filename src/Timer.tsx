import React, {
  FC,
  useRef,
  useLayoutEffect,
  useState,
  useCallback
} from "react";
import { PlayState } from "./GameState";

export type TimerProps = {
  playState: PlayState;
};

export const Timer: FC<TimerProps> = ({ playState }) => {
  const [time, setTime] = useState<string>('');
  const prevState = useRef<PlayState | null>(playState);
  const start = useRef<number | null>(null);
  const request = useRef<number | null>(null);

  const updateTime = useCallback(
    (elapsed: number) => {
      if (!start.current) {
        start.current = elapsed;
      }

      const newTime = Math.round(((elapsed - start.current) / 1000 + Number.EPSILON) * 100) /
      100;
      
      const [whole, fraction] = newTime.toString().split('.');
      const padded = [whole, (fraction ?? '').padEnd(2, '0')].join('.')
      setTime(padded);
      request.current = requestAnimationFrame(updateTime);
    },
    [setTime]
  );

  useLayoutEffect(() => {
    if (prevState.current !== playState) {
      switch (playState) {
        case PlayState.ACTIVE:
          start.current = null;
          request.current = requestAnimationFrame(updateTime);
          break;
        case PlayState.NEW:
          request.current && cancelAnimationFrame(request.current);
          start.current = null;
          break;
        case PlayState.GAME_OVER:
        case PlayState.WIN:
          request.current && cancelAnimationFrame(request.current);
          break;
        default:
          break;
      }
    }

    return () => {
      request.current && cancelAnimationFrame(request.current);
    };
  }, [playState, updateTime]);
  
  return (
    <div>
      <span role="img" aria-label="Time">
        ⏲️
      </span>{" "}
      {time}
    </div>
  );
};