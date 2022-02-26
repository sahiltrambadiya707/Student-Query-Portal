import React, { useEffect } from "react";
import "../Style/index.css";
import Main from "./Main";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../../../actions";

function Index() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.AllQuestion);

  useEffect(() => {
    dispatch(getQuestion());
  }, [dispatch]);

  return (
    <>
      <div className="stack-index">
        <div className="stack-index-content">
          <Main questions={questions?.questions} />
        </div>
      </div>
    </>
  );
}

export default Index;
