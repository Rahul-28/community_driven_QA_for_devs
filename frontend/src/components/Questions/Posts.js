import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import parse from "html-react-parser";

export default function Posts({ posts }) {
  const [noOfAns, setNoOfAns] = useState({});
  const [votes, setVotes] = useState({});

  // Function to find the count of answers for a particular question
  const findFrequencyOfAns = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/answer/findNumberOfAns",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setNoOfAns(json);
    } catch (error) {
      console.error("Error fetching answer frequencies:", error);
    }
  };

  // Function to fetch votes for questions
  const fetchVotes = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/question/fetchallVotes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setVotes(json);
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  };

  useEffect(() => {
    findFrequencyOfAns();
    fetchVotes();
  }, []);

  return (
    <ul>
      {posts.map((question) => (
        <li key={question._id} className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <div className="all-option">
                  <p>{votes[question._id] || 0}</p>
                  <span>votes</span>
                </div>
                <div className="all-option">
                  <p>{noOfAns[question._id] || 0}</p>
                  <span>Answers</span>
                </div>
              </div>
            </div>
            <div className="question-answer">
              <NavLink
                to={`/question/${question._id}`}
                className="card-title"
                style={{ textDecoration: "none", color: "#0074CC" }}
              >
                <h4>{question.title}</h4>
              </NavLink>
              <div style={{ width: "90%" }}>
                <small style={{ fontSize: "12px" }}>
                  {parse(question.question || "")}
                </small>
              </div>
              <div className="mt-3">
                {(question.tags || "").split(" ").map((tag) => (
                  <NavLink
                    key={tag}
                    to={`/questionOntags/${tag.toLowerCase()}`}
                    className="question-tags"
                    style={{
                      color: "hsl(205,47%,42%)",
                      backgroundColor: "hsl(205,46%,92%)",
                      borderRadius: "5px",
                    }}
                  >
                    {tag}
                  </NavLink>
                ))}
              </div>
              <div className="author">
                <small className="d-flex flex-row-reverse">
                  asked {question.date.slice(0, 10)} at{" "}
                  {question.date.slice(11, 16)}
                  <p style={{ color: "#0074CC" }}>{question.postedBy} &nbsp;</p>
                </small>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
