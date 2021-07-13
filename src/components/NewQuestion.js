import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import logo from '../wur.png';

class NewQuestion extends Component {

  state = {
    option1: '',
    option2: '',
    toHome: false,
  }

  //method which handling submit button
  handleSubmit = (e) => {
    e.preventDefault()

    const { option1, option2 } = this.state
    if (option1 !== "" && option2 !== "") {
      const { dispatch } = this.props

      //add the question to the store
      dispatch(handleAddQuestion(option1, option2))
      //redirect to home after submitting
      this.setState(() => ({
        text: '',
        toHome: true,
      }))
    }

  }
  //method which handling option1
  handleChange1 = (e) => {
    const option1 = e.target.value

    this.setState(() => ({
      option1
    }))
  }
    //method which handling option2
  handleChange2 = (e) => {
    const option2 = e.target.value

    this.setState(() => ({
      option2
    }))
  }

  render() {

    const { option1, option2, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (

      <div>
        <h2>Create New Question</h2>
        <div className='cardNew'>
          <img src={logo} alt=""/>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="option 1" value={option1} onChange={this.handleChange1} />
            <p>OR</p>
            <input type="text" placeholder="option 2" value={option2} onChange={this.handleChange2} />
            <input type="submit" value="ADD QUESTION" />
          </form>
        </div>
      </div>
    )
  }
}
export default connect()(NewQuestion)