import React from "react";
import "../Style/ViewQuestion.css";
import ViewQuestion from "./ViewQuestion";

function Index(i) {
  return (
    <>
      <div key={i} className="stack-index">
        <div className="stack-index-content">
          <ViewQuestion />
        </div>
      </div>
    </>
  );
}

export default Index;
