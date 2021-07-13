import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from "../actions/authedUser";

class Nav extends Component {

  //logout by setting the autheduser to be logged out
  logout = () => {
    this.props.dispatch(setAuthedUser("LOGGED_OUT"))
  }
  render() {

    const { users, authedUser } = this.props
    const user = users[authedUser]

    return (
      <div>

        <div className="nav-container">
          <NavLink to='/' exact className="header-item"
            activeClassName='active'>
            Home
          </NavLink>

          <NavLink to='/add' className="item" activeClassName='active'>
            New Question
          </NavLink>

          <NavLink to='/leaderboard' className="item" activeClassName='active'>
            Leaderboard
          </NavLink>

          <div className="user">
          {/*Depend on the user is logged in or not we will display the picture and the logout link */}
            {user === undefined ?
              <div>
                <span>Hello, Please Login</span>
                <img className="avatar-img" src="https://img2.thejournal.ie/inline/1881369/original/?width=630&version=1881369" alt="" />
              </div>
              : <div><span>Hello, {user.name} </span>
                <img className="avatar-img" src={user.avatarURL} alt="" />
                <NavLink className="logout" onClick={this.logout} to="/" exact >
                  Logout
                </NavLink>
              </div>}

          </div>

        </div>
      </div>

    )
  }
}
function mapStateToProps({ authedUser, users }) {

  return {
    users: users,
    authedUser: authedUser
  }
};
export default connect(mapStateToProps)(Nav);
