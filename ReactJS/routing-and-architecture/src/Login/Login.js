import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: null,
      password: null
    }

    this.handleChange = props.handleChange.bind(this)
  }

  render() {
    return (
      <div className="Login">
        { /* TODO */}
        <h1>Login</h1>
        <form onSubmit={(e) => this.props.handleSubmit(e, this.state, false)}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" onChange={this.handleChange}
            placeholder="Ivan Ivanov" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={this.handleChange}
            placeholder="******" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
