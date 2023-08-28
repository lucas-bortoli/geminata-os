import { render } from "preact";
import "./index.css";
import { Window } from "./System/UI/Window";
import { HelloAppWindow } from "./Programs/Hello/main";
import { MainMenu } from "./System/UI/MainMenu";

function App() {
  return (
    <>
      <MainMenu />
      <HelloAppWindow />
    </>
  );
}

render(<App />, document.getElementById("app")!);
