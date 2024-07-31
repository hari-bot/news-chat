import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import News from "../components/News";

const HomePage = () => {
  const userName = useSelector((state) => state.user.userName);

  return (
    <div>
      <NavBar />
      <News />
    </div>
  );
};

export default HomePage;
