import React, { Component } from 'react';

class Details extends Component {
  render() {
    return (
      <div className="Home">
        { /* TODO */}
        <h1>{this.props.movie.title}</h1>
        <ul className="movies">
          {}
        </ul>
      </div>
    );
  }
}

export default Details;
