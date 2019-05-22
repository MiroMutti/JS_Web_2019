import React, { Component } from 'react';
import { Link, } from 'react-router-dom';

import '../App.css'

class Header extends Component {
    render() {
        return (
            <header>
                <Link to="/" className="logo">Interactive IMDB</Link>
                <div className="header-right">
                    <a href="/">Home</a>
                    {this.props.username ?
                        (
                            this.props.isAdmin ? (
                                <span>
                                    <Link to="/">Welcome Admin!</Link>
                                    <span>
                                        <Link to="/create">Create</Link>
                                    </span>
                                    <Link to="#">Logout</Link>
                                </span>
                            )
                                :
                                <span>
                                    <Link to="/">Welcome {this.props.username}!</Link>
                                    <Link to="/" onClick={this.props.logout()}>Logout</Link>
                                </span>)
                        :
                        (<span>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </span>)
                    }
                </div>
            </header>
        )
    }
}

export default Header