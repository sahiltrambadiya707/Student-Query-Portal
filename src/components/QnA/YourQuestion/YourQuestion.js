import React, { useEffect } from "react";
import Navbar from "../../Utils/Navbar";
import "../Style/YourQuestion.css";
import { useDispatch, useSelector } from "react-redux";
import { getYourQuestion, deleteYourQuestion } from "../../../actions/index";

const YourQuestion = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const yourQuestion = useSelector((state) => state.yourQuestion);
  const email = user.email;

  useEffect(() => {
    if (yourQuestion.delete.status == 200) {
      dispatch(getYourQuestion(email));
    }
  }, [dispatch, email, yourQuestion.delete]);

  const deleteQ = (payload) => {
    dispatch(deleteYourQuestion(payload));
  };

  useEffect(() => {
    dispatch(getYourQuestion(email));
  }, [dispatch, email]);

  return (
    <>
      <Navbar />
      <div className="cus-container">
        <p className="p"> Your Questions </p>
        {yourQuestion.yourQuestions.length > 0 ? (
          yourQuestion?.yourQuestions?.map((_q) => (
            <div key={_q._id} className="question-grid">
              <div className="question-grid-items">{_q.title}</div>
              <div className="question-grid-items">
                <button
                  className="button"
                  onClick={() => {
                    const payload = _q._id;

                    deleteQ(payload);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1>nothing</h1>
        )}
      </div>
    </>
  );
};

export default YourQuestion;
