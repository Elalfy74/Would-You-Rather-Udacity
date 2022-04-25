import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Dashboard from "./components/Dashboard/Dashboard";
import LoadingBar from "react-redux-loading";
import Login from "./components/Login/Login";
import QuestionView from "./components/QuestionView/QuestionView";
import NewQuestion from "./components/NewQuestion/NewQuestion";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import Nav from "./components/Nav/Nav";
import NotFound from "./components/NotFound/NotFound";
import { setAuthedUser } from "./actions/authedUser";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(setAuthedUser("LOGGED_OUT"));
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          {this.props.loading ? null : (
            <Fragment>
              <LoadingBar />
              <Nav />
              <div>
                {/*render the login component every time of refresh */}
                {this.props.loggedOut ? (
                  <Login />
                ) : (
                  <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/question/:id" component={QuestionView} />
                    <Route path="/add" component={NewQuestion} />
                    <Route path="/leaderboard" component={LeaderBoard} />
                    <Route path="/not-found" component={NotFound} />
                  </Switch>
                )}
              </div>
            </Fragment>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    loggedOut: authedUser === "LOGGED_OUT",
  };
}

export default connect(mapStateToProps)(App);
