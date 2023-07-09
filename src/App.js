import { useState } from 'react';
import './App.css';
import List from './Component/List/List';
import SignIn from './Component/SignIn/SignIn';

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const handleAuthentication = (username, password) => {
    if (username === "Juhil" && password === "1") {
      console.log("Authentication successful. Redirecting...");
      setAuthenticated(true);

    } else {
      console.log("Invalid username or password.");
    }
  }
  return (
    <div className="App">
      
      {authenticated ? (
        <List />
      ) : (
        <SignIn onAuthentication={handleAuthentication} />
      )}
    </div>
  );
}

export default App;
