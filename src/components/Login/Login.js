import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../../actions/authedUser";
import "./Login.css";
class Login extends Component {
  state = {
    user: "",
  };
  //set the Authed User
  handleLogin = (e) => {
    e.preventDefault();

    const { user } = this.state;
    const { dispatch } = this.props;
    if (user !== "") {
      dispatch(setAuthedUser(user));
    }
  };
  //handle the user's selection
  handleuser = (e) => {
    e.preventDefault();
    const user = e.target.value;
    if (!user) {
      return;
    }
    //set the state depend on the user's selection
    this.setState(() => ({
      user,
    }));
  };
  render() {
    const { users } = this.props;
    const usersArray = Object.keys(users);

    return (
      <div className="container login-container">
        <div className="login-card">
          <h2>Would you rather game</h2>
          <p>Sign in</p>
          <form onSubmit={this.handleLogin}>
            <select defaultValue={"DEFAULT"} onChange={this.handleuser}>
              <option value="DEFAULT" disabled>
                Please Choose...
              </option>
              {usersArray.map((username) => (
                <option key={username} value={username}>
                  {users[username].name}
                </option>
              ))}
            </select>
            <button type="submit" className="btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

//get the state from the store
function mapStateToProps({ users }) {
  return { users: users };
}

export default connect(mapStateToProps)(Login);
