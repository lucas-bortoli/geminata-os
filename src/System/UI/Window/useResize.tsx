import { Ref, useEffect, useState } from "preact/hooks";

type RefMaybe = Ref<HTMLElement | null | undefined>;
type ResizeDirection = "h" | "v" | "both";

type ResizeState = {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: ResizeDirection;
} | null;

/**
 * Checks if a <= x <= c
 */
const inRange = (x: number, a: number, b: number) => {
  return x >= a && x <= b;
};

const getMouseCorner = (event: MouseEvent, resizeArea: HTMLElement): null | ResizeDirection => {
  const rect = resizeArea.getBoundingClientRect();
  const cornerSize = 16;

  if (
    inRange(event.clientX, rect.right - cornerSize, rect.right + cornerSize) &&
    inRange(event.clientY, rect.bottom - cornerSize, rect.bottom + cornerSize)
  ) {
    return "both";
  } else if (inRange(event.pageX, rect.right - cornerSize, rect.right + cornerSize)) {
    return "h";
  } else if (inRange(event.pageY, rect.bottom - cornerSize, rect.bottom + cornerSize)) {
    return "v";
  }

  return null;
}

export function useResize(resizableElement: RefMaybe, resizeArea: RefMaybe) {
  const [resizeState, setResizeState] = useState<ResizeState>(null);

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      if (!resizableElement.current || !resizeArea.current) {
        return;
      } else if (event.target !== resizeArea.current || event.button !== 0) {
        return;
      }

      const rect = resizableElement.current!.getBoundingClientRect();

      setResizeState({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        direction: getMouseCorner(event, resizableElement.current!) ?? "both",
      });

      event.preventDefault();
    }

    function onMouseUp(event: MouseEvent) {
      if (resizeState !== null) {
        event.stopImmediatePropagation();
        event.preventDefault();
        setResizeState(null);
      }
    }

    function onMouseMove(event: MouseEvent) {
      if (resizeState === null || resizableElement === null || !resizableElement.current) {
        return;
      }

      const element = resizableElement.current;

      if (resizeState.direction === "h" || resizeState.direction === "both") {
        element.style.width = `${event.pageX - resizeState.x}px`;
      }

      if (resizeState.direction === "v" || resizeState.direction === "both") {
        element.style.height = `${event.pageY - resizeState.y}px`;
      }
    }

    if (resizeState === null) document.body.addEventListener("mousedown", onMouseDown);
    if (resizeState !== null) document.body.addEventListener("mouseup", onMouseUp);
    if (resizeState !== null) document.body.addEventListener("mousemove", onMouseMove);

    return () => {
      document.body.removeEventListener("mousedown", onMouseDown);
      document.body.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mousemove", onMouseMove);
    };
  }, [resizeState]);

  return resizeState;
}
