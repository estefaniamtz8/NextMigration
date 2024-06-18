import React from 'react';

const ProgressBar = (args) => {
  const { bgcolor, progress, height, labelCheck } = args;
  const Parentdiv = {
    height,
    width: '100%',
    backgroundColor: 'pink',
    borderRadius: 40,
  };

  const Childdiv = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height,
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: 'center',
    verticalAlign: 'middle',
  };

  const progresstext = {
    color: 'white',
    fontFamily: 'Helvetica',
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>{labelCheck ? <span style={progresstext}>{`${progress}%`}</span> : null}</div>
    </div>
  );
};

export default ProgressBar;
