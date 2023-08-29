import { useRef } from "preact/hooks";
import styles from "./Window.module.scss";
import { useDrag } from "./useDrag";
import { useResize } from "./useResize";
import { Dimensions } from "../Types";
import { PropsWithChildren } from "preact/compat";
import { useStacking } from "./useStacking";

interface Props {
  title?: string;
  minimizeButton?: boolean;
  maximizeButton?: boolean;
  closeButton?: boolean;
  initialDimensions?: Dimensions;
  minDimensions?: Dimensions;
  maxDimensions?: Dimensions;
  resizable?: boolean;
  movable?: boolean;
}

export function Window(props: PropsWithChildren<Props>) {
  const initialDimensions = props.initialDimensions ?? { width: 200, height: 200 };
  const minDimensions = props.minDimensions ?? initialDimensions;
  const maxDimensions = props.maxDimensions;
  const isResizable = props.resizable !== false;
  const isMovable = props.movable !== false;

  const windowRef = useRef<HTMLDivElement | null>(null);
  const titlebarRef = useRef<HTMLDivElement | null>(null);
  const resizeHandleRef = useRef<HTMLDivElement | null>(null);

  const dragState = isMovable && useDrag(windowRef, titlebarRef);
  const resizeState = isResizable && useResize(windowRef, resizeHandleRef);

  useStacking(windowRef);

  return (
    <div
      className={styles.windowWrapper}
      x-dragging={Boolean(dragState || resizeState)}
      ref={windowRef}
      style={{
        width: `${initialDimensions.width}px`,
        height: `${initialDimensions.height}px`,
        minWidth: `${minDimensions.width}px`,
        minHeight: `${minDimensions.height}px`,
        maxWidth: maxDimensions && `${maxDimensions.width}px`,
        maxHeight: maxDimensions && `${maxDimensions.height}px`,
      }}>
      {isResizable && !dragState && <div className={styles.resizeBorder} ref={resizeHandleRef} />}
      <div className={styles.window}>
        <div className={styles.titlebar} ref={titlebarRef}>
          <span>{props.title}</span>
          <div className={styles.buttons}>
            <button className={styles.minimize} />
            <button className={styles.maximize} />
            <button className={styles.close} />
          </div>
        </div>
        <main className={styles.content}>{props.children}</main>
      </div>
    </div>
  );
}
