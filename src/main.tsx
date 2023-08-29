import { render } from "preact";
import "./index.css";
import { Window } from "./System/UI/Window";
import { HelloAppWindow } from "./Programs/Hello/main";
import { MainMenu } from "./System/UI/MainMenu";
import { SystemVersionWindow } from "./Programs/SystemVersion/main";

function App() {
  return (
    <>
      <MainMenu />
      <HelloAppWindow />
      <SystemVersionWindow />
    </>
  );
}

render(<App />, document.getElementById("app")!);
