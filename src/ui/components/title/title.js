import React from 'react';
import './title.css';

const Title = (props) => {

  return (
    <div className="page-title">
      {props.title}
    </div>
  )

}

export default Title;
