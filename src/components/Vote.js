import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from "../utils/api"
import { formatQuestion } from '../utils/_DATA'
class Vote extends Component {
    render() {
        
        const { question } = this.props
        if (question === null) {
          return <p>This question doesn't existd</p>
        }
        const {
          timestamp, author, optionOne, optionTwo
        } = question
        return (
            <div>
            <div className='question'>
              <p>{author.name} asks would you rather?</p>
              <div>{formatDate(timestamp)}</div>
              <p>{optionOne.text}</p>
              <p>{optionTwo.text}</p>
            </div>
          </div>
        )
    }
}


function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    const optionOneText = questions[id].optionOne.text
    const optionTwoText = questions[id].optionTwo.text
    return {
      authedUser,
      question: question
        ? formatQuestion(optionOneText, optionTwoText, users[question.author])
        : null
    }
  } 

export default connect(mapStateToProps)(Vote);