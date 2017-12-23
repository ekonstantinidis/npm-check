import * as React from 'react';
import { connect } from 'react-redux';

import Navbar from '../js/components/navigation';
import HomePage from '../js/sections/home';
import ResultsPage from '../js/sections/results';

interface IProps {
  results: any;
}

class Container extends React.Component<IProps, object> {
  render() {
    return (
      <div>
        <Navbar />
        <HomePage />

        {!this.props.results.get('response').isEmpty() && <ResultsPage />}
      </div>
    );
  }
}

interface IState extends React.HTMLAttributes<HTMLUListElement> {
  results: any;
  project: any;
}

function mapStateToProps(state: IState) {
  return {
    results: state.results,
  };
}

export default connect(mapStateToProps, null)(Container);