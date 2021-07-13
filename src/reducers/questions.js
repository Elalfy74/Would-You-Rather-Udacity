import { ADD_QUESTION, RECEIVE_QUESTIONS, SAVE_ANSWER } from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:

      return {
        ...state,
        [action.question.id]: action.question
      }
    case SAVE_ANSWER:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          optionOne: {
            votes: 'optionOne' === action.answer ?
              state[action.id].optionOne.votes.concat([action.authedUser])
              : state[action.id].optionOne.votes,
            text: state[action.id].optionOne.text
          },
          optionTwo: {
            votes: 'optionTwo' === action.answer ?
              state[action.id].optionTwo.votes.concat([action.authedUser])
              : state[action.id].optionTwo.votes,
            text: state[action.id].optionTwo.text
          }

        }
      }

    default:
      return state
  }
}