import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class QuestionView extends Component {
  state = {
    value: ""
  }
  //mehtod which handling the poll choice
  handleChange = (e) => {
    const value = e.target.value
    this.setState(() => ({
      value
    }))
  }
  //mehtod which handling the vote button
  handleVote = (e) => {
    e.preventDefault()
    const { dispatch, id } = this.props
    const { value } = this.state
    //add the answer to the store
    dispatch(handleSaveAnswer(id, value))
  }
  render() {
    const { users, questions, authedUser, id } = this.props
    //if the questions dosen't exist render not found
    const question = questions[id]
    if (question === undefined) {
      return <Redirect to='/not-found' />
    }
    else {
      //get the options text, the option which the user voted for if exist and percentages of votes
      const author = questions[id].author
      const user = users[author]
      const optionOneText = question.optionOne.text
      const optionTwoText = question.optionTwo.text
      const votes = { optionone: question.optionOne.votes, optiontwo: question.optionTwo.votes }
      //get the precentages of the votes
      const opti1 = votes.optionone.length
      const opti2 = votes.optiontwo.length
      const sum = opti1 + opti2

      const percentOptionOne =
        Math.round((opti1 / sum) * 10000) / 100;
      const percentOptionTwo =
        Math.round((opti2 / sum) * 10000) / 100;

      const voteForOne = votes.optionone.includes(authedUser)
      const voteForTwo = votes.optiontwo.includes(authedUser)
      return (

        <div>
          <div className='cardQuestion'>
            <img src={user.avatarURL} width="100%" alt="" />
            <h1>{user.name}</h1>
            {/*Render the poll results if the user already voted else render a poll with vote button*/}
            {voteForOne || voteForTwo ?
              <div>
                <br />
                <p>Results</p>
                <p>{optionOneText}<span>({opti1} of {sum} Votes)</span></p>
                <progress id="file" value={percentOptionOne} max="100"> {percentOptionOne} </progress>
                {voteForOne ? <p className="voted">Voted</p> : null}
                <p>{percentOptionOne}%</p>
                <p>{optionTwoText}<span>({opti2} of {sum} Votes)</span></p>
                <progress id="file2" value={percentOptionTwo} max="100"> {percentOptionTwo} </progress>
                {voteForTwo ? <p className="voted">Voted</p> : null}
                <p>{percentOptionTwo}%</p>
              </div>
              :
              <div>
                <form onChange={this.handleChange} onSubmit={this.handleVote}>
                  <p> asks would you rather?</p>
                  <input type="radio" id="opOne" name="vote" value="optionOne" />
                  <label id="lab" htmlFor="opOne">{optionOneText}</label><br />
                  <input type="radio" id='opTwo' name="vote" value="optionTwo" />
                  <label htmlFor="opTwo">{optionTwoText}</label><br />
                  <input type="submit" value="Submit"/>
                </form>
              </div>
            }
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps({ users, authedUser, questions }, props) {
  const { id } = props.match.params

  return {
    users,
    questions,
    authedUser,
    id
  }
}

export default connect(mapStateToProps)(QuestionView);