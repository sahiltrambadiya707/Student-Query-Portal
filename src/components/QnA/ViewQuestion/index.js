import React from "react";
import "../Style/ViewQuestion.css";
import ViewQuestion from "./ViewQuestion";
import Navbar from "../../Utils/Navbar";

function Index(i) {
  return (
    <>
      <Navbar />
      <div key={i} className="stack-index">
        <div className="stack-index-content">
          <ViewQuestion />
        </div>
      </div>
    </>
  );
}

export default Index;
