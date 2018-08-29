import React from "react";
import LandingPage from "pages/LandingPage/LandingPage";
import withRoot from '../withRoot';

class Index extends React.Component {
  render() {
    return (
        <LandingPage></LandingPage>
    );
  }
}

export default withRoot(Index);
