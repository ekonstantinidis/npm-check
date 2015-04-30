var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Input = ReactBootstrap.Input;

var Package = React.createClass({
  getInitialState: function () {
    return {
      dependency: this.props.dependency
    };
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({
      dependency: newProps.dependency
    });
  },

  compareVersionNumbers: function (v1, v2){
    // http://stackoverflow.com/a/6832721/11236
    // http://jsfiddle.net/ripper234/Xv9WL/28/
    console.log(v1);
    console.log(v2);
    var v1parts = v1.split('.');
    var v2parts = v2.split('.');

    function isPositiveInteger(x) {
      // http://stackoverflow.com/a/1019526/11236
      return /^\d+$/.test(x);
    }

    // First, validate both numbers are true version numbers
    function validateParts(parts) {
        for (var i = 0; i < parts.length; ++i) {
            if (!isPositiveInteger(parts[i])) {
                return false;
            }
        }
        return true;
    }

    if (!validateParts(v1parts) || !validateParts(v2parts)) {
        return NaN;
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length === i) {
            return 1;
        }

        if (v1parts[i] === v2parts[i]) {
            continue;
        }
        if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        return -1;
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
  },

  upToDate: function () {
    var installedVersion = this.state.dependency.version;
    var latestVersion = this.state.dependency.current['dist-tags'].latest;
    var isUpToDate = this.compareVersionNumbers(installedVersion, latestVersion);
    console.log(isUpToDate);
    if (isUpToDate >= 0) {
      return 'has-latest fa fa-check-circle';
    } else if (isUpToDate < 0) {
      return 'has-previous fa fa-exclamation-circle';
    }
  },

  render: function () {
    return (
      <Row className='package'>
        <Col sm={1} className='status'><i className={this.upToDate()}></i></Col>
        <Col sm={4} className='name'><small>name</small> {this.state.dependency.name}</Col>
        <Col xs={6} sm={3} className=''><small>required</small> {this.state.dependency.version}</Col>
        <Col xs={6} sm={3} className=''><small>latest</small> {this.state.dependency.current['dist-tags'].latest}</Col>
        <Col xs={6} sm={1} className=''><small>more</small> coming</Col>
      </Row>
    );
  }
});

module.exports = Package;