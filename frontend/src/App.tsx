import React from 'react';

import Login from "./components/login";

function App() {
  return (
    <div className="w-screen h-screen flex margin-16">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      
      <h1>React frontend started</h1>
      <Login />
    </div>
  );
}

export default App;
