import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
class Dashboard extends Component {
    state = {
        questions: this.props.unanswedQuestionIDS,
        green: true

    }
    //update the state when the component got new props
    componentDidUpdate(prevProps) {
        if (this.props.unanswedQuestionIDS !== prevProps.unanswedQuestionIDS) {
            this.setState({ questions: this.props.unanswedQuestionIDS });
        }
    }
    //update the state to show the answerd question
    flip = () => {
        if (this.state.green === true) {
            this.setState(() => ({
                questions: this.props.answedQuestionIDS,
                green: !this.state.green
            }))
        }
    }
    //update the state to show the answerd question
    flip2 = () => {
        if (this.state.green === false) {
            this.setState(() => ({
                questions: this.props.unanswedQuestionIDS,
                green: !this.state.green
            }))
        }
    }

    render() {
        //definie classes for style
        const btn_class = this.state.green ? "grennButton" : "whiteButton";
        const btn_class2 = this.state.green ? "whiteButton" : "grennButton";

        return (

            <div className="dashboard">

                <div className="topmenu">
                    <a className={btn_class} onClick={this.flip2}>Show unanswedQuestion</a>
                    <a className={btn_class2} onClick={this.flip}>Show Answerd</a>
                </div>

                <ul>
                    {this.state.questions.map((id) => (
                        <li key={id}><Question id={id} /></li>
                    ))}
                </ul>

            </div>
        )
    }
}
//function to get state from the store
function mapStateToProps({ users, questions, authedUser }) {

    let userAnswers = users[authedUser].answers
    let answerdquestions = Object.keys(userAnswers)

    let answedQuestionIDS = []
    let unanswedQuestionIDS = []

    //sorting the questions based on timesamp
    let questionsIDS = Object.keys(questions)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    //get the unanswerd questions and answerd ones 
    questionsIDS.map((id) => {
        if (answerdquestions.includes(id)) {
            answedQuestionIDS.push(id)
        }
        else {
            unanswedQuestionIDS.push(id)
        }
        return answedQuestionIDS
    })

    return {
        answedQuestionIDS: answedQuestionIDS,
        unanswedQuestionIDS: unanswedQuestionIDS
    }
}
export default connect(mapStateToProps)(Dashboard)