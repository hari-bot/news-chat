import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import News from "../components/News";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <News />
    </div>
  );
};

export default HomePage;
