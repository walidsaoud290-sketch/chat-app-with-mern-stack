import React from "react";
import { useContext } from "react";
import { context } from "../App";
import { useEffect } from "react";

const Settings = () => {
  const { user, setUser } = useContext(context);
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export default Settings;
