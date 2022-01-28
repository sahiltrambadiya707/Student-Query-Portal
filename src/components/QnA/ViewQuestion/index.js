import React from "react";
import "../Style/ViewQuestion.css";
import ViewQuestion from "./ViewQuestion";
import Navbar from "../../Utils/Navbar";

function Index() {
  return (
    <>
      <Navbar />
      <div className="stack-index">
        <div className="stack-index-content">
          <ViewQuestion />
        </div>
      </div>
    </>
  );
}

export default Index;
