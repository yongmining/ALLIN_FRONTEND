import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">All-in</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="../contents/contents">contents</Link>
      </div>
    </nav>
  );
};

export default Home;
