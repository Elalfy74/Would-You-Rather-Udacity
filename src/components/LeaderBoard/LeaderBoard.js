import React, { Component } from "react";
import { connect } from "react-redux";
import "./LeaderBoard.css";
class LeaderBoard extends Component {
  render() {
    const { sortedScore } = this.props;

    return (
      <div className="container leaderboard-container">
        <h2>LeaderBoard</h2>
        <ul className=" leaderboard">
          {Object.keys(sortedScore).map((user, index) => (
            <li key={user} className="leaderboard-card">
              <p>{index === 0 ? "Gold" : index === 1 ? "Silver" : "Bronze"}</p>
              <div className="leaderboard-card-body">
                <img src={sortedScore[user].avatarURL} alt="" />
                <div className="info">
                  <h3>{sortedScore[user].name}</h3>
                  <p>Score</p>
                  <span className="score">{sortedScore[user].score}</span>
                  <p>Number of questions</p>
                  <span>{sortedScore[user].questions.length}</span>
                  <p>Number of answers</p>
                  <span>{Object.keys(sortedScore[user].answers).length}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const userScore = {};
  //make new object of users with score prop
  Object.keys(users).forEach((uid) => {
    const user = users[uid];
    const answeredQuestions = Object.keys(user.answers).length;
    const createdQuestions = user.questions.length;
    user.score = answeredQuestions + createdQuestions;
    userScore[uid] = user;
  });
  //sorting the users by score
  const sortedScore = {};
  Object.keys(users)
    .map((uid) => users[uid])
    .sort((a, b) => b.score - a.score)
    .forEach((user) => {
      sortedScore[user.id] = user;
    });

  return { sortedScore };
}
export default connect(mapStateToProps)(LeaderBoard);
