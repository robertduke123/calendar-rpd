import React from "react";
import Calendar from "./state/components/calendar/Calendar";
import Details from "./state/components/details/Details";
import Event from "./state/components/event/Event";
import FullYear from "./state/components/fullYear/FullYear";

function App() {
  return (
    <div className="app">
      <div className="containers">
        <Details/>
        <Event/>
      </div>
      <div className="containers">
        <Calendar/>
        <FullYear/>
      </div>
      
    </div>
  );
}

export default App;
