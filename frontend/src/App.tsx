import React from 'react';

import Login from "./components/login";
import Signup from "./components/signup"

function App() {
  return (
    <div className="w-screen h-screen flex mx-16">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      
      <h1>React frontend started</h1>
      <Login />
      <Signup />
    </div>
  );
}

export default App;
