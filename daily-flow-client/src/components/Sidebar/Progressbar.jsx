import React, { useState, useEffect } from 'react';
import './CircleProgressBar.css';

const CircleProgressBar = ({ percentage }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const progress = (100 - percentage) / 100;
    setOffset(251.3274 * progress);
  }, [percentage]);

  return (
    <div className="circle-progress-container">
      <svg className="circle-progress" width="80" height="80">
        <circle className="circle-progress-background" cx="40" cy="40" r="35"></circle>
        <circle
          className="circle-progress-bar"
          cx="40"
          cy="40"
          r="35"
          strokeDasharray="219.9115"
          strokeDashoffset={offset}
        ></circle>
      </svg>
      <div className="circle-progress-text">
        <span>{percentage}</span>
        <span>%</span>
      </div>
    </div>
  );
};

export default CircleProgressBar;
