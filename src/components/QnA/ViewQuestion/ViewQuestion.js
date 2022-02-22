import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Editor from "react-quill/lib/toolbar";
import ReactHtmlParser from "react-html-parser";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../Style/AllQuestion.css";
import { stringAvatar } from "../../Utils/Avatar";
import {
  getQuestionDetails,
  addAnswer,
  addComment,
} from "../../../actions/index";
import moment from "moment";

const ViewQuestion = () => {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [
      { color: ["#ff0000", "#00ff00", "#0000ff", "#220055"] },
      { background: [] },
    ],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      matchVisual: false,
    },
  };
  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user);
  const ViewQuestion = useSelector((state) => state.viewQuestion);
  const dispatch = useDispatch();

  const handleQuill = (value) => {
    setAnswer(value);
  };

  useEffect(() => {
    dispatch(getQuestionDetails(id));
  }, [dispatch, id]);

  const handleSubmit = async () => {
    if (answer !== "") {
      const body = {
        question_id: id,
        answer: answer,
        user: user,
        headers: {
          "Content-Type": "application/json",
        },
      };
      dispatch(addAnswer(body)).then((res) => {
        if (res) {
          dispatch(getQuestionDetails(id));
        }
      });
    }
  };

  const handleComment = async () => {
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        user: user,
      };
      dispatch(addComment(body)).then((res) => {
        setShow(false);
        if (res) {
          dispatch(getQuestionDetails(id));
        }
      });
    }
  };

  return (
    <>
      <div className="main">
        <div className="main-container">
          <div className="main-top">
            <h2 className="main-question">
              {ViewQuestion.questionDetail.title}
            </h2>
            <Link to="/add-question">
              <button className="button">Ask Question</button>
            </Link>
          </div>
          <div className="main-desc">
            <div className="info">
              <p>
                Asked
                <span>
                  {moment(ViewQuestion.questionDetail?.created_at).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </span>
              </p>
            </div>
          </div>
          <div className="all-questions">
            <div className="all-questions-container">
              <div className="all-questions-left">
                <div className="all-options"></div>
              </div>
              <div className="question-answer">
                <p>{ReactHtmlParser(ViewQuestion.questionDetail?.body)}</p>

                <div className="author">
                  <small>
                    asked{" "}
                    {moment(ViewQuestion.questionDetail?.created_at).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </small>
                  <div className="auth-details">
                    <Avatar
                      {...stringAvatar(ViewQuestion.questionDetail?.user?.name)}
                    />
                    <p>
                      {ViewQuestion.questionDetail?.user?.name
                        ? ViewQuestion.questionDetail?.user?.name
                        : "AnonUser"}
                    </p>
                  </div>
                </div>
                <div className="comments">
                  <div className="comment">
                    {ViewQuestion.questionDetail.comments &&
                      ViewQuestion.questionDetail.comments.map((_qd) => (
                        <p key={_qd?._id}>
                          {_qd.comment}
                          <span>- {_qd.user ? _qd.user.name : "AnonUser"}</span>

                          <small>
                            {moment(_qd.created_at).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </small>
                        </p>
                      ))}
                  </div>
                  <p onClick={() => setShow(!show)}>Add a comment</p>
                  {show && (
                    <div className="title">
                      <textarea
                        style={{
                          margin: "5px 0px",
                          padding: "10px",
                          border: "1px solid rgba(0, 0, 0, 0.2)",
                          borderRadius: "3px",
                          outline: "none",
                        }}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="text"
                        placeholder="Add your comment..."
                        rows={5}
                      />
                      <button
                        className="button"
                        onClick={handleComment}
                        style={{
                          maxWidth: "fit-content",
                        }}
                      >
                        Add comment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              flexDirection: "column",
            }}
            className="all-questions"
          >
            <p
              style={{
                marginBottom: "20px",
                fontSize: "1.3rem",
                fontWeight: "300",
              }}
            >
              {ViewQuestion?.questionDetail?.answerDetails?.length}
              Answers
            </p>
            {ViewQuestion.questionDetail.answerDetails &&
              ViewQuestion.questionDetail.answerDetails.map((_q) => (
                <>
                  <div
                    style={{
                      border: "1px solid #d0d0d0",
                      margin: "10px 0px",
                      padding: "10px",
                    }}
                    key={_q?._id}
                    className="all-questions-container"
                  >
                    <div className="all-questions-left">
                      <div className="all-options"></div>
                    </div>
                    <div className="question-answer">
                      {ReactHtmlParser(_q.answer)}
                      <div className="author">
                        <small>
                          asked{" "}
                          {moment(_q.created_at).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </small>
                        <div className="auth-details">
                          <Avatar {...stringAvatar(_q?.user?.name)} />
                          <p>{_q?.user?.name ? _q?.user?.name : "AnonUser"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className="main-answer">
          <h3
            style={{
              fontSize: "22px",
              margin: "10px 0",
              fontWeight: "400",
            }}
          >
            Your Answer
          </h3>
          <ReactQuill
            value={answer}
            onChange={handleQuill}
            modules={Editor.modules}
            className="react-quill"
            theme="snow"
            style={{
              height: "200px",
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="button"
          style={{
            marginTop: "100px",
            maxWidth: "fit-content",
          }}
        >
          Post your answer
        </button>
      </div>
    </>
  );
};

export default ViewQuestion;
