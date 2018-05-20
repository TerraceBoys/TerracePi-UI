import React, { Component, PropTypes } from 'react';
import './../styles/home.css';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { PENDING, SUCCEEDED } from '../utils/requestStatusTypes';
import AppTile from '../components/AppTile';
import {
  launchBaseball,
  launchMBTA,
  launchPersonPicker,
} from '../actions/piControlActions';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.renderLoadingScreen = this.renderLoadingScreen.bind(this);
    this.handleBeerBoysClick = this.handleBeerBoysClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      launchBaseballRequestStatus,
      launchPersonPickerRequestStatus,
      pushRoute,
    } = this.props;
    if (
      launchBaseballRequestStatus === PENDING &&
      nextProps.launchBaseballRequestStatus === SUCCEEDED
    ) {
      pushRoute('/baseball');
    }
    if (
      launchPersonPickerRequestStatus === PENDING &&
      nextProps.launchPersonPickerRequestStatus === SUCCEEDED
    ) {
      pushRoute('/person-picker');
    }
  }

  handleBeerBoysClick() {
    const { pushRoute } = this.props;
    pushRoute('/beer-boys');
  }

  renderLoadingScreen() {
    const { launchBaseballRequestStatus } = this.props;
    if (launchBaseballRequestStatus === PENDING) {
      return (
        <div className="baseball-loading-popup">
          <i
            className="fa fa-spinner fa-3x rotating m-top-3"
            aria-hidden="true"
          />
          <div className="m-top-3">Loading Baseball...</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="home-container">
        {this.renderLoadingScreen()}
        <div className="home-title">Terrace Pi Control</div>
        <div className="home-button-container">
          <AppTile
            className="launch-mbta-button"
            label="MBTA Times"
            launchApp={this.props.launchMBTA}
          />
          <AppTile
            className="launch-baseball-button"
            label="Baseball"
            launchApp={this.props.launchBaseball}
          />
          <AppTile
            className="launch-people-button"
            label="Person Picker"
            launchApp={this.props.launchPersonPicker}
          />
          <AppTile
            className="launch-beer-boys-button"
            label="Beer Boys"
            launchApp={this.handleBeerBoysClick}
          />
        </div>
      </div>
    );
  }
}

HomeContainer.propTypes = {
  pushRoute: PropTypes.func.isRequired,
  launchBaseball: PropTypes.func.isRequired,
  launchMBTA: PropTypes.func.isRequired,
  launchBaseballRequestStatus: PropTypes.string.isRequired,
  launchPersonPicker: PropTypes.func.isRequired,
  launchPersonPickerRequestStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { params }) => {
  return {
    launchBaseballRequestStatus: state.piControl.launchBaseballRequestStatus,
    launchPersonPickerRequestStatus:
      state.piControl.launchPersonPickerRequestStatus,
  };
};

export default connect(mapStateToProps, {
  push: pushRoute,
  launchBaseball,
  launchMBTA,
  launchPersonPicker,
})(HomeContainer);
