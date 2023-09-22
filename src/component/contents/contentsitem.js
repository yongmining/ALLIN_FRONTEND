import React from "react";
import { Link } from "react-router-dom";

const Contentsitem = ({ content }) => {
  return (
    <div className="content-item">
      <Link to={`/contents/${content.id}`}>
        <h3>{content.title}</h3>
        <p>{content.desc}</p>
        <p>{content.technology}</p>
        <p>{content.url}</p>
      </Link>
    </div>
  );
};

export default Contentsitem;