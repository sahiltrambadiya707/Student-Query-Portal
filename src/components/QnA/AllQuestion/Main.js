import React from "react";
import "../Style/Main.css";
import AllQuestions from "./AllQuestion";
import { Link } from "react-router-dom";

function Main({ questions }) {
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/add-question">
            <button className="button">Ask Question</button>
          </Link>
          <Link to="/your-question">
            <button className="button">Your Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <p>{questions?.length} questions</p>
        </div>
        <div className="questions">
          {questions?.map((_q) => (
            <div key={_q._id} className="question">
              <AllQuestions data={_q} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
