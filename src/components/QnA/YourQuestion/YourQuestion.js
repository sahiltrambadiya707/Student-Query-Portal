import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Style/YourQuestion.css";
import { useDispatch, useSelector } from "react-redux";
import { getYourQuestion, deleteYourQuestion } from "../../../actions/index";
import { toast } from "react-toastify";
import ReactHtmlParser from "react-html-parser";

const YourQuestion = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const yourQuestion = useSelector((state) => state.yourQuestion);
  const email = user?.email;

  useEffect(() => {
    if (yourQuestion?.delete?.status === 200) {
      dispatch(getYourQuestion(email));
    } else {
      dispatch(getYourQuestion(email));
    }
  }, [dispatch, email, yourQuestion.delete]);

  const deleteQ = async (payload, key) => {
    try {
      dispatch(deleteYourQuestion(payload, key));
    } catch (error) {
      toast.error("Something went wrong...!", { autoClose: 2000 });
    }
  };

  return (
    <>
      <div className="cus-container">
        <p className="p"> Your Questions </p>
        {yourQuestion?.yourQuestions?.QnA?.question?.length > 0 ? (
          yourQuestion?.yourQuestions?.QnA?.question?.map((_q) => (
            <div key={_q?._id} className="question-grid">
              <div className="question-grid-items">{_q?.title}</div>
              <div className="question-grid-items">
                <div className="link">
                  <Link to={`view-question?q=${_q?._id}`}>Question</Link>
                </div>
                <button
                  className="button"
                  onClick={() => {
                    const payload = _q?._id;

                    deleteQ(payload, "question");
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="h5">You Have No Questions</p>
        )}
      </div>
      <div className="cus-container">
        <p className="p"> Your Answers </p>
        {yourQuestion?.yourQuestions?.QnA?.answer?.length > 0 ? (
          yourQuestion?.yourQuestions?.QnA?.answer?.map((_q) => (
            <div key={_q?._id} className="question-grid">
              <div className="question-grid-items">{ReactHtmlParser(_q?.answer)}</div>
              <div className="question-grid-items">
                <div className="link">
                  <Link to={`view-question?q=${_q?.question_id}`}>Answer</Link>
                </div>
                <button
                  className="button"
                  onClick={() => {
                    const payload = _q?._id;

                    deleteQ(payload, "answer");
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="h5">You Have No Answers</p>
        )}
      </div>
      <div className="cus-container">
        <p className="p"> Your Comments </p>
        {yourQuestion?.yourQuestions?.QnA?.comment?.length > 0 ? (
          yourQuestion?.yourQuestions?.QnA?.comment?.map((_q) => (
            <div key={_q?._id} className="question-grid">
              <div className="question-grid-items">{_q?.comment}</div>
              <div className="question-grid-items">
                <div className="link">
                  <Link to={`view-question?q=${_q?.question_id}`}>Comments</Link>
                </div>
                <button
                  className="button"
                  onClick={() => {
                    const payload = _q?._id;

                    deleteQ(payload, "comment");
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="h5">You Have No Comments</p>
        )}
      </div>
    </>
  );
};

export default YourQuestion;
