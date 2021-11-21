import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInit, setisInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setisInit(true);
    });
  }, []);
  return (
    <>
      {isInit ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing"
      )}
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
