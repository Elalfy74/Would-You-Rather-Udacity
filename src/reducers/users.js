import { RECEIVE_USERS } from '../actions/users'
import { SAVE_ANSWER } from '../actions/questions'
import { ADD_QUESTION } from '../actions/questions'
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case SAVE_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: Object.assign(state[action.authedUser].answers, { [action.id]: action.answer })
        }
      }
    case ADD_QUESTION:
      const author = action.question.author
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([action.question.id])
        }
      }
    default:
      return state
  }
}