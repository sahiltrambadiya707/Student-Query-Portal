import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../Style/AddQuestion.css";
import Editor from "react-quill/lib/toolbar";
import { TagsInput } from "react-tag-input-component";
import { useHistory } from "react-router-dom";
import { AddQuestions } from "../../../actions/AddQuestion";
import { toast } from "react-toastify";

function AddQuestion() {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
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
    "image",
    "video",
  ];

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleQuill = (value) => {
    setBody(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== "" && body !== "") {
      const bodyJSON = {
        title: title,
        body: body,
        tag: JSON.stringify(tag),
        user: user,
      };
      try {
        await dispatch(AddQuestions(bodyJSON)).then((res) => {
          history.push("/all-question");
        });
      } catch (error) {
        toast.error("Something went wrong...!", { autoClose: 2000 });
      }
    }
  };

  return (
    <>
      <div className="add-question">
        <div className="add-question-container">
          <div className="head-title">
            <h1>Ask a public question</h1>
          </div>
          <div className="question-container">
            <div className="question-options">
              <div className="question-option">
                <div className="title">
                  <h3>Title</h3>
                  <small>
                    Be specific and imagine you’re asking a question to another
                    person
                  </small>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                  />
                </div>
              </div>
              <div className="question-option">
                <div className="title">
                  <h3>Body</h3>
                  <small>
                    Include all the information someone would need to answer
                    your question
                  </small>
                  <ReactQuill
                    value={body}
                    onChange={handleQuill}
                    modules={Editor.modules}
                    className="react-quill"
                    theme="snow"
                  />
                </div>
              </div>
              <div className="question-option">
                <div className="title">
                  <h3>Tags</h3>
                  <small>
                    Add up to 5 tags to describe what your question is about
                  </small>
                  <TagsInput
                    value={tag}
                    onChange={setTag}
                    name="fruits"
                    placeHolder="press enter to add new tag"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            style={{ maxWidth: "fit-content", marginTop: "10px" }}
            onClick={handleSubmit}
            className="button"
          >
            Add your question
          </button>
        </div>
      </div>
    </>
  );
}

export default AddQuestion;
