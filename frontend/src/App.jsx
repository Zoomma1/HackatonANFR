import * as React from "react";
import "./App.css";
import {Header} from "./Components/Header";
import {App_BackGround} from "./Components/BackGround";
import AddWeekNumber from "./Components/Calendar";

function App() {
  return (
        <div className="App">
            <Header/>
            <AddWeekNumber/>
        </div>

    );
}

export default App;
