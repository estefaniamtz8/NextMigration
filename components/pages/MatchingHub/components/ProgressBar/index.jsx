import React from 'react';
import PropTypes from 'prop-types';
import { parentdiv, childdiv, progresstext } from './styles';

const ProgressBar = ({ bgcolor, progress, height, width = '100%' }) => (
  <div style={parentdiv(height, width)}>
    <div style={childdiv(height, progress, bgcolor)}>
      <span className="text-[14px]" style={progresstext}>{`${progress}%`}</span>
    </div>
  </div>
);

ProgressBar.propTypes = {
  bgcolor: PropTypes.string.isRequired,
  progress: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string,
};

export default ProgressBar;
