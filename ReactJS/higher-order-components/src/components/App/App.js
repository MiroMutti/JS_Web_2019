import React, { Component } from 'react';
import Article from '../Article/Article';
import RegisterForm from '../RegisterForm/RegisterForm';
import Navigation from '../Navigation/Navigation';
import './App.css';
import warningWrapper from '../../hocs/warningWrapper';
import errorHandlingWrapper from './../../hocs/ErrorHandlingWrapper';
import BindingForm from '../BindingForm/BindingForm';

const ArticleWithWarning = warningWrapper(errorHandlingWrapper(Article))
const NavigationWithWarning = warningWrapper(errorHandlingWrapper(Navigation))
const RegisterFormWithWarning = warningWrapper(errorHandlingWrapper(RegisterForm))

class App extends Component {
  onSubmit(e, data) {
    e.preventDefault()
  }
  render() {
    return (
      <section className="App">
        <BindingForm onSubmit={this.onSubmit}>
          <input type="text" name='username' placeholder='username' />
          <input type="password" name='password' placeholder='password' />
        </BindingForm>
        <ArticleWithWarning />
        <RegisterFormWithWarning />
        <NavigationWithWarning />
      </section>
    );
  }
}

export default App;
