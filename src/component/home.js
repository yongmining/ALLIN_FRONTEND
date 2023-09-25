import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="home">
        <p>You Film Face?</p>
      </div>
      <div className="home">
        <p>감정을 보여주세요</p>
        <Link to="./profile">프로필</Link>
      </div>
    </div>
  );
};

export default Home;