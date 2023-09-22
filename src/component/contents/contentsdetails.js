import React from "react";
import { useParams } from "react-router-dom";

const Contentsdetails = () => {
    const { id } = useParams();
    return (
        <div>
            <h4>content Details {id}</h4>
            <p>
                내용1
            </p>
        </div>
    );
};

export default Contentsdetails