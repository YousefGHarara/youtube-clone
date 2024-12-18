import "./home.css";
import Feed from "../../components/feed/feed";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

import React, { useState } from "react";

const Home = ({sidebar}) => {
  const [category, setCategory] = useState(0);
  
  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
      <div className={`container ${sidebar? "" : "large-container"}`}>
        <Feed category={category}/>
      </div>
    </>
  );
};

export default Home;
