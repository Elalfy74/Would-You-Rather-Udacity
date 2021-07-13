import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
    render() {
        const { sortedScore } = this.props

        return (
            <div>
                <ul className="leaderBoard">
                    {Object.keys(sortedScore).map((user) => (
                        <li key={user}>
                            <div className='card'>
                                <img src={sortedScore[user].avatarURL} alt="" />
                                <h1>{sortedScore[user].name}</h1>
                                <p className="scoretext">Score</p>
                                <div className="score">{sortedScore[user].score}</div>
                                <p>Number of questions: {sortedScore[user].questions.length}</p>
                                <p>Number of answers: {Object.keys(sortedScore[user].answers).length}</p>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        )
    }
}

function mapStateToProps({ users }) {

    const userScore = {};
    //make new object of users with score prop
    Object.keys(users).forEach(uid => {
        const user = users[uid];
        const answeredQuestions = Object.keys(user.answers).length;
        const createdQuestions = user.questions.length;
        user.score = answeredQuestions + createdQuestions;
        userScore[uid] = user;
    });
    //sorting the users by score
    const sortedScore = {};
    Object.keys(users)
        .map(uid => users[uid])
        .sort((a, b) => b.score - a.score)
        .forEach(user => {
            sortedScore[user.id] = user;
        });

    return { sortedScore };
}
export default connect(mapStateToProps)(LeaderBoard)
