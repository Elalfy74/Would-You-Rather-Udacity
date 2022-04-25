import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setAuthedUser } from "../../actions/authedUser";
import "./Nav.css";

class Nav extends Component {
  //logout by setting the autheduser to be logged out
  logout = () => {
    this.props.dispatch(setAuthedUser("LOGGED_OUT"));
  };
  render() {
    const { users, authedUser } = this.props;
    const user = users[authedUser];

    return (
      <div className="nav-container">
        <nav>
          <NavLink to="/" exact className="item" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/add" className="item" activeClassName="active">
            New Question
          </NavLink>
          <NavLink to="/leaderboard" className="item" activeClassName="active">
            Leaderboard
          </NavLink>
        </nav>

        {/*Depend on the user is logged in or not we will display the picture and the logout link */}
        {user === undefined ? (
          <div className="user">
            <span>Hello, Please Login</span>
            <img
              className="avatar-img"
              src="https://www.seekpng.com/png/full/966-9665493_my-profile-icon-blank-profile-image-circle.png"
              alt="user profile"
            />
          </div>
        ) : (
          <div className="user">
            <p>Hello, {user.name} </p>
            <img
              className="avatar-img"
              src={user.avatarURL}
              alt="user profile"
            />
            <NavLink className="logout" onClick={this.logout} to="/" exact>
              Logout
            </NavLink>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps({ authedUser, users }) {
  return {
    users: users,
    authedUser: authedUser,
  };
}
export default connect(mapStateToProps)(Nav);
