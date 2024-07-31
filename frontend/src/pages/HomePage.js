import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const userName = useSelector((state) => state.user.userName);

  return (
    <div>
      <h1>Welcome, {userName} !</h1>
      <p>HomePage</p>
    </div>
  );
};

export default HomePage;
