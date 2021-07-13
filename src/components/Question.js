import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/_DATA'
import { Link, withRouter } from 'react-router-dom'


class Question extends Component {
  render() {

    const { id, question } = this.props
    const {
       author, optionOne, optionTwo,
    } = question
    return (
      <div>
        <div className='card'>
          <img src={author.avatarURL} alt=""/>
          <h1>{author.name} asks would you rather?</h1>
          <p>{optionOne.text}</p>
          <p className='or'>_______OR_________</p>
          <p>{optionTwo.text}</p>
          <Link to={`/question/${id}`} className="btn">View Question</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]
  //get options value
  const optionOneText = questions[id].optionOne.text
  const optionTwoText = questions[id].optionTwo.text

  return {
    id,
    authedUser,
    question: question
      ? formatQuestion({ optionOneText, optionTwoText, author: users[question.author] })
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Question))
