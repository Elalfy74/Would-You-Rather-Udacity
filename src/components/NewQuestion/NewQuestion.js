import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../../actions/questions";
import { Redirect } from "react-router-dom";
import logo from "../../wur.png";
import "./NewQuestion.css";

class NewQuestion extends Component {
  state = {
    option1: "",
    option2: "",
    toHome: false,
  };

  //method which handling submit button
  handleSubmit = (e) => {
    e.preventDefault();

    const { option1, option2 } = this.state;
    if (option1 !== "" && option2 !== "") {
      const { dispatch } = this.props;

      //add the question to the store
      dispatch(handleAddQuestion(option1, option2));
      //redirect to home after submitting
      this.setState(() => ({
        text: "",
        toHome: true,
      }));
    }
  };
  //method which handling option1
  handleChange1 = (e) => {
    const option1 = e.target.value;

    this.setState(() => ({
      option1,
    }));
  };
  //method which handling option2
  handleChange2 = (e) => {
    e.preventDefault();
    const option2 = e.target.value;

    this.setState(() => ({
      option2,
    }));
  };

  render() {
    const { option1, option2, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="new-question-container container">
        <div className="new-question">
          <h2>Create New Question</h2>
          <div className="cardNew">
            <img src={logo} alt="" />
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Option One"
                value={option1}
                onChange={this.handleChange1}
              />
              <span>OR</span>
              <input
                type="text"
                placeholder="Option Two"
                value={option2}
                onChange={this.handleChange2}
              />
              <input type="submit" value="ADD QUESTION" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect()(NewQuestion);
