import { Button } from "../../System/UI/Widgets/Button";
import { Window } from "../../System/UI/Window";
import styles from "./styles.module.css";

export function SystemVersionWindow() {
  return (
    <Window initialDimensions={{ width: 420, height: 360 }} title="About Geminata">
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img src="/GeminataLogo.png" className={styles.logoMain} />
        </div>
        <div className={styles.content}>GeminataOS v0.2.1</div>
        <div className={styles.buttons}>
          <Button>Cancel</Button>
          <Button>OK</Button>
        </div>
      </div>
    </Window>
  );
}
