import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReduxSweetAlert, { swal } from 'react-redux-sweetalert'; // eslint-disable-line


class Main extends Component {
  static propTypes = {
    swal: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div>
        <button
          onClick={() => this.props.swal({
            title: 'Warning!',
            text: 'Are you sure?',
            type: 'info',
            showCancelButton: true,
            onCancel: () => console.log('cancel!'),
          })}
        >Alert</button>
        <ReduxSweetAlert />
      </div>
    );
  }
}


export default connect(null, {
  swal,
})(Main);
