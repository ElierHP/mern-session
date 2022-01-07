import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUserSettings = async () => {
    //Get User Settings from DB
    const res = await axios.get("/userSettings");
    if (res.data.darkMode === true) {
      setDarkMode(res.data.darkMode);
    }
  };

  useEffect(() => {
    //Check user settings on page load
    try {
      setIsLoading(true);
      getUserSettings();
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  const toggleDarkMode = async () => {
    try {
      setIsLoading(true);
      //Creates dark mode session on backend
      const res = await axios.post("/setDarkMode", {
        darkMode: darkMode,
      });
      //Toggle dark mode to false
      if (res.data.darkMode === true) {
        setDarkMode(false);
        await axios.post("/setDarkMode", {
          darkMode: false,
        });
      }
      //Toggle dark mode to true
      if (res.data.darkMode === false) {
        setDarkMode(true);
        await axios.post("/setDarkMode", {
          darkMode: true,
        });
      }
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  if (isError) return <h1>Error... could not change modes.</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div>
      {darkMode ? (
        <h1>Currently in Dark Mode</h1>
      ) : (
        <h1>Currently in Light Mode</h1>
      )}
      {darkMode ? (
        <button onClick={toggleDarkMode}>Light Mode</button>
      ) : (
        <button onClick={toggleDarkMode}>Dark Mode</button>
      )}
    </div>
  );
}

export default App;
