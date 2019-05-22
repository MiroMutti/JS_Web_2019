import React from 'react';
import './House.css';

const House = function (props) {
    return (
      <div className="House" onMouseEnter={() => props.selectHouse(props.id)}>
        <img src={props.imageUrl} alt="img"></img>
      </div>
    );
}

export default House;
