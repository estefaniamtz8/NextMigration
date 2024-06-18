import React from 'react';
import PropTypes from 'prop-types';

/**
 * ProgressBarTricolor Component
 * @param {Object} args - Object of component properties
 * @param {string} [args.width='80%'] - Total width of the progress bar in percentage
 * @param {string} [args.widthGreen='35%'] - Width of the green part of the progress bar in percentage
 * @param {string} [args.widthGray='60%'] - Width of the gray part of the progress bar in percentage
 * @param {string} [args.widthRed='5%'] - Width of the red part of the progress bar in percentage
 * @param {string} [args.height='1.5vh'] - Height of the progress bar
 * @param {function} [args.functOn=() => {}] - Function to be called on click
 * @param {string} [args.color] - Background color for the progress bar
 * @returns {JSX.Element} - JSX element representing the ProgressBarTricolor component
 */
const ProgressBarTricolor = ({
  functOn = () => {},
  widthGreen = '35%',
  widthGray = '60%',
  widthRed = '5%',
  width = '80%',
  height = '1.5vh',
  color,
}) => {
  const getBorderRadiusGray = () => {
    if (widthGreen === '0%' && widthRed === '0%') {
      return '10px';
    }
    return '10px 0 0 10px';
  };

  const getBorderRadiusGreen = () => {
    if (widthGray === '0%' && widthRed === '0%') {
      return '10px';
    }
    if (widthRed === '0%') {
      return '0 10px 10px 0';
    }
    if (widthGray === '0%') {
      return '10px 0 0 10px';
    }
    return '0 0 0 0';
  };

  const getBorderRadiusRed = () => {
    if (widthGreen === '0%' && widthGray === '0%') {
      return '10px';
    }
    return '0 10px 10px 0';
  };

  return (
    <div className="progress-bar-container" onClick={functOn} style={{ height, width }}>
      <div className="progress-bar-background" style={{ height }}>
        <div
          className="progress-bar-foreground"
          style={{ width: `${width}`, backgroundColor: color, height }}
        >
          <div
            className="progress-bar-gray"
            style={{ width: widthGray, borderRadius: getBorderRadiusGray(), height }}
          />
          <div
            className="progress-bar-green"
            style={{ width: widthGreen, borderRadius: getBorderRadiusGreen(), height }}
          />
          <div
            className="progress-bar-red"
            style={{ width: widthRed, borderRadius: getBorderRadiusRed(), height }}
          />
        </div>
      </div>
    </div>
  );
};

ProgressBarTricolor.propTypes = {
  functOn: PropTypes.func,
  widthGreen: PropTypes.string,
  widthGray: PropTypes.string,
  widthRed: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
};

export default ProgressBarTricolor;
