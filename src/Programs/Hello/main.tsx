import { Window } from "../../System/UI/Window";
import { Button } from "../../System/UI/Widgets/Button";
import { Input } from "../../System/UI/Widgets/Input";
import { MenuBar, MenuItem, Menu, MenuDivider } from "../../System/UI/Widgets/MenuBar";
import { StatusBar, StatusBarItem } from "../../System/UI/Widgets/StatusBar";
import styles from "./hello.module.css";

export function HelloAppWindow() {
  return (
    <Window title="Hello World" initialDimensions={{ width: 640, height: 480 }} minDimensions={{width: 200, height: 200}}>
      <div className={styles.appWrapper}>
        <MenuBar>
          <MenuItem label="Arquivo">
            <Menu>
              <MenuItem label="Abrir" />
              <MenuItem label="Salvar" />
              <MenuDivider />
              <MenuItem label="Sair" />
            </Menu>
          </MenuItem>
          <MenuItem label="Ver"></MenuItem>
        </MenuBar>
        <main className={styles.main}>
          <Input />
          <Button>Hello world!</Button>
        </main>
        <StatusBar>
          <StatusBarItem>OK</StatusBarItem>
        </StatusBar>
      </div>
    </Window>
  );
}

/*
async function AppMain(args: string[]): App {
  // request a Window from the OS
  const mainWindow = Window.requestWindow();
  const contents = Window.getContainer(mainWindow)!;

  Window.setTitle(mainWindow, "Hello World!");

  render(
    <div>
      <h1>Hello World!</h1>
    </div>,
    contents
  );

  Window.onClose(mainWindow, () => {
    // Unmount preact
  });

  return 0;
}*/
