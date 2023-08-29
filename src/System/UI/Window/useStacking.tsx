import { Ref, useEffect } from "preact/hooks";

type RefMaybe = Ref<HTMLElement | null | undefined>;

// Sei que devo usar a ContextApi para isso, mas por enquanto tá OK
let zIndex = 200;

export function useStacking(wind: RefMaybe) {
  useEffect(() => {
    function handleMouseDown() {
      if (!wind || !wind.current) {
        return;
      }

      wind.current.style.zIndex = `${++zIndex}`;
    }

    if (wind.current) wind.current.addEventListener("mousedown", handleMouseDown);

    return () => {
      if (wind.current) wind.current.removeEventListener("mousedown", handleMouseDown);
    };
  }, [wind]);
}
