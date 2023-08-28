/// <reference types="vite/client" />
/*
declare module "os/window" {
  export type WindowHandle = number & { __kind?: "window" };

  export function requestWindow(): WindowHandle;
  export function setTitle(window: WindowHandle, title: string);
  export function setRectangle(
    window: WindowHandle,
    width: number,
    height: number,
    x?: number,
    y?: number
  );
  export function getContainer(window: WindowHandle): HTMLElement | null;
  export function onClose(window: WindowHandle, callback: () => void);
}
*/
