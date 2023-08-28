import { useEffect, useState } from "preact/hooks";
import { Menu, MenuBar, MenuItem } from "../Widgets/MenuBar";
import styles from "./mainMenu.module.scss";

export function MainMenu() {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <MenuBar className={styles.bar}>
      <MenuItem label="Applications">
        <Menu>
          <MenuItem label="Firefox" />
        </Menu>
      </MenuItem>
      <MenuItem label="Places" />
      <MenuItem label="System" />
      <span className={styles.spacer} />
      <span>{clock.toTimeString().slice(0, 5)}</span>
    </MenuBar>
  );
}
