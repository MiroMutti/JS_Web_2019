import React, { Component } from 'react';
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        { /* TODO */}
        <h1>All movies</h1>
        <ul className="movies">
          {this.props.movies.map(movie => {
            return (
              <li key={movie._id} className="movie">
                <h2>{movie.title}</h2><img
                  src={movie.poster} />
                <span>
                  <button>View Trailer</button>
                  <button>View Story Line</button>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default Home;
