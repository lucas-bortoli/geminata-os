import { Ref, useEffect, useState } from "preact/hooks";

type RefMaybe = Ref<HTMLElement | null | undefined>;

export function useDrag(movableElement: RefMaybe, dragArea: RefMaybe = movableElement) {
  const [dragState, setDragState] = useState<null | {
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  }>(null);

  useEffect(() => {
    if (!movableElement.current || !dragArea.current) {
      return;
    }

    function onMouseDown(event: MouseEvent) {
      if (event.target !== dragArea.current) {
        return;
      }

      event.preventDefault();

      const rect = movableElement.current!.getBoundingClientRect();

      setDragState({
        x: event.clientX,
        y: event.clientY,
        offsetX: event.clientX - rect.x,
        offsetY: event.clientY - rect.y,
      });
    }

    function onMouseUp(event: MouseEvent) {
      if (dragState !== null) {
        event.stopImmediatePropagation();
        event.preventDefault();
        setDragState(null);
      }
    }

    function onMouseMove(event: MouseEvent) {
      const { pageX: x, pageY: y } = event;

      if (dragState === null || !movableElement.current) {
        return;
      }

      const element = movableElement.current;

      element.style.left = `${x - dragState.offsetX}px`;
      element.style.top = `${y - dragState.offsetY}px`;
    }

    if (dragState === null) document.body.addEventListener("mousedown", onMouseDown);
    if (dragState !== null) document.body.addEventListener("mouseup", onMouseUp);
    if (dragState !== null) document.body.addEventListener("mousemove", onMouseMove);

    return () => {
      document.body.removeEventListener("mousedown", onMouseDown);
      document.body.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mousemove", onMouseMove);
    };
  }, [dragState]);

  return dragState;
}
