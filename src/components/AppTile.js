import React, { Component, PropTypes } from 'react';

class AppTile extends Component {
  render() {
    const { className, label, launchApp } = this.props;
    return (
      <div className={`home-app-button ${className}`} onClick={launchApp}>
        {label}
      </div>
    );
  }
}

AppTile.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  launchApp: PropTypes.func.isRequired,
};

export default AppTile;
