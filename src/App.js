import React from "react";
import Calendar from "./state/components/calendar/Calendar";
import Details from "./state/components/details/Details";

function App() {
  return (
    <div className="app">
      <Details/>
      <Calendar/>
    </div>
  );
}

export default App;
