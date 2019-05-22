import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';

import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Create/Create';
import Header from './Header/Header'
import './App.css';
import Details from './Details/Details';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      isAdmin: false,
      movies: [],
      selectedMovieId: 0 
    }
  }

  logout(event) {
    // TODO: prevent the default state
    // TODO: delete the data from the sessionStorage
    // TODO: update the state (user: null)
    event.preventDefault()
    localStorage.removeItem('username')
    localStorage.removeItem('isAdmin')
    this.setState({
        username: null,
        isAdmin: false
    })
 }

  componentWillMount() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    if (localStorage.getItem('username')) {
      this.setState({
        username: localStorage.getItem('username'),
        isAdmin: isAdmin
      })
    }
    fetch('http://localhost:9999/feed/movies')
      .then(rawData => rawData.json())
      .then(body => {
        this.setState({
          movies: body.movies
        })
        toast.success(body.message, {
          closeButton: false
        })
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e, data, isSignup) {
    e.preventDefault()
    fetch('http://localhost:9999/auth/sign' + (isSignup ? 'up' : 'in'), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(rawData => rawData.json())
      .then(resBody => {
        if (resBody.username) {
          this.setState({
            username: resBody.username,
            isAdmin: resBody.isAdmin
          })
          localStorage.setItem('username', resBody.username)
          localStorage.setItem('isAdmin', resBody.isAdmin)
          toast.success(`Welcome,  ${resBody.username}`, {
            closeButton: false
          })
        }
        else {
          toast.error(resBody.message, {
            closeButton: false
          })
        }
      })
  }

  handleCreateSubmit(e, data) {
    e.preventDefault()
    fetch('http://localhost:9999/feed/movie/create', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(rawData => rawData.json())
      .then(resBody => {
        if (!resBody.errors) {
          toast.success(resBody.message, {
            closeButton: false
          })
        } else {
          toast.error(resBody.message, {
            closeButton: false
          })
        }
      })
  }

  render() {
    return (
      <div className="App">
        { /* TODO */}
        <ToastContainer />
        <BrowserRouter>
          <Fragment>
            <Header isAdmin={this.state.isAdmin} username={this.state.username} logout={this.logout} />
            <Switch>
              <Route
                path='/' exact
                render={(props) =>
                  <Home
                    {...props}
                    movies={this.state.movies}
                  />}
              />
              <Route
                path='/movies/:id'
                
                render={(props) =>
                  <Details
                    {...props}
                    movie={this.state.movies[this.state.selectedMovieId]}
                  />}
              />
              <Route
                path='/register'
                render={(props) =>
                  <Register
                    {...props}
                    handleSubmit={this.handleSubmit.bind(this)}
                    handleChange={this.handleChange} />}
              />
              <Route path='/login'
                render={() =>
                  <Login
                    handleSubmit={this.handleSubmit.bind(this)}
                    handleChange={this.handleChange} />}
              />
              <Route path='/create'
                render={(props) =>
                  this.state.isAdmin ?
                    <Create
                      {...props}
                      handleCreateSubmit={this.handleCreateSubmit.bind(this)}
                      handleChange={this.handleChange} /> :
                    <Redirect to={{ pathname: '/login' }} />}
              />
              <Route path={() => <h1>Not found!</h1>} />
            </Switch>
          </Fragment>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
