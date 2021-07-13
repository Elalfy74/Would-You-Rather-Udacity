import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function saveAnswer(answer, id, authedUser) {
  return {
    type: SAVE_ANSWER,
    answer,
    id,
    authedUser
  }
}

//function which handling the new question
export function handleAddQuestion(option1, option2) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return _saveQuestion({
      optionOneText: option1,
      optionTwoText: option2,
      author: authedUser,
    }
    )
      .then((question) => dispatch(addQuestion(question, authedUser)))
      .then(() => dispatch(hideLoading()))
  }

}

//function which handling the answer from the user
export function handleSaveAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    return _saveQuestionAnswer({
      authedUser: authedUser,
      qid: qid,
      answer: answer
    })
      .then(() => dispatch(saveAnswer(answer, qid, authedUser)))

  }
}