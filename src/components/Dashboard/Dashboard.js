import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "../Question/Question";
import "./Dashboard.css";

class Dashboard extends Component {
  state = {
    questions: this.props.unanswedQuestionIDS,
    answer: false,
  };
  //update the state when the component got new props
  componentDidUpdate(prevProps) {
    if (this.props.unanswedQuestionIDS !== prevProps.unanswedQuestionIDS) {
      this.setState({ questions: this.props.unanswedQuestionIDS });
    }
  }
  //update the state to show the answerd question
  showAnswer = () => {
    if (this.state.answer === false) {
      this.setState(() => ({
        questions: this.props.answedQuestionIDS,
        answer: !this.state.answer,
      }));
    }
  };
  showUnAnswer = () => {
    if (this.state.answer === true) {
      this.setState(() => ({
        questions: this.props.unanswedQuestionIDS,
        answer: !this.state.answer,
      }));
    }
  };
  render() {
    //definie classes for style
    const unAnswerdClass = this.state.answer ? "" : "active";
    const answerdClass = this.state.answer ? "active" : "";

    return (
      <div className="container dashboard-container">
        <div className="dashboard">
          <div className="topmenu">
            <button className={unAnswerdClass} onClick={this.showUnAnswer}>
              Show UnAnswered Questions
            </button>
            <button className={answerdClass} onClick={this.showAnswer}>
              Show Answerd Questions
            </button>
          </div>
          {this.state.questions.length === 0 ? (
            <h2>No Question Found</h2>
          ) : (
            <ul>
              {this.state.questions.map((id) => (
                <Question key={id} id={id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
//function to get state from the store
function mapStateToProps({ users, questions, authedUser }) {
  let userAnswers = users[authedUser].answers;
  let answerdquestions = Object.keys(userAnswers);

  let answedQuestionIDS = [];
  let unanswedQuestionIDS = [];

  //sorting the questions based on timesamp
  let questionsIDS = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  //get the unanswerd questions and answerd ones
  questionsIDS.map((id) => {
    if (answerdquestions.includes(id)) {
      answedQuestionIDS.push(id);
    } else {
      unanswedQuestionIDS.push(id);
    }
    return answedQuestionIDS;
  });

  return {
    answedQuestionIDS: answedQuestionIDS,
    unanswedQuestionIDS: unanswedQuestionIDS,
  };
}
export default connect(mapStateToProps)(Dashboard);
