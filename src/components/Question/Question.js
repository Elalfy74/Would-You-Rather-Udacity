import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../../utils/_DATA";
import { Link, withRouter } from "react-router-dom";
import "./Question.css";

class Question extends Component {
  render() {
    const { id, question } = this.props;
    const { author, optionOne, optionTwo } = question;
    return (
      <li className="question-card">
        <div className="card-body">
          <img src={author.avatarURL} alt="img" />
          <div className="info">
            <h2>{author.name} asks</h2>
            <h3>Would you rather?</h3>
            <p>{optionOne.text}</p>
            <span className="or">OR</span>
            <p>{optionTwo.text}</p>
            <div className="link">
              <Link to={`/question/${id}`} className="btn">
                View Question
              </Link>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  //get options value
  const optionOneText = questions[id].optionOne.text;
  const optionTwoText = questions[id].optionTwo.text;

  return {
    id,
    authedUser,
    question: question
      ? formatQuestion({
          optionOneText,
          optionTwoText,
          author: users[question.author],
        })
      : null,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
