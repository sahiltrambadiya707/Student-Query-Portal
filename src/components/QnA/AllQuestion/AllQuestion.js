import { Avatar } from "@material-ui/core";
import React from "react";
import "../Style/ViewQuestion.css";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { stringAvatar } from "../../Utils/Avatar";
import moment from "moment";

function AllQuestion({ data }) {
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  let tags = JSON.parse(data?.tags[0]);
  return (
    <>
      <div className="all-questions">
        <div className="all-questions-container">
          <div className="all-questions-left">
            <div className="all-options">
              <div className="all-option">
                <p>{data?.answerDetails?.length}</p>
                <span>answers</span>
              </div>
            </div>
          </div>
          <div className="question-answer">
            <Link to={`/view-Question?q=${data?._id}`}>{data.title}</Link>
            <div
              style={{
                maxWidth: "90%",
              }}
            >
              <div>{ReactHtmlParser(truncate(data.body, 200))}</div>
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              {tags.map((_tag) => (
                <p
                  key={_tag._d}
                  style={{
                    margin: "10px 5px",
                    padding: "5px 10px",
                    backgroundColor: "#007cd446",
                    borderRadius: "3px",
                  }}
                >
                  {_tag}
                </p>
              ))}
            </div>
            <div className="author">
              <small>
                {moment(data.created_at).format("MMMM Do YYYY, h:mm:ss a")}
              </small>
              <div className="auth-details">
                <Avatar {...stringAvatar(data?.user?.name)} />
                <p>{data?.user?.name ? data?.user?.name : "AnonUser"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllQuestion;
