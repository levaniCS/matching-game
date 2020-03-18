import React from 'react';

const Stopwatch = (props) => {
  return (
    <div className='stopwatch'>
      <label>{(props.lapse / 1000).toFixed(1)}</label>
    </div>
  );
};

export default Stopwatch;
