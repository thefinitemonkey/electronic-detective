import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getSetupData, changeGameScreen } from "../actions/index";
import CircularProgress from "material-ui/CircularProgress";

class Loader extends PureComponent {
  state = {
    loading: true,
    numPlayers: 1
  };

  componentDidMount = () => {
    // Need to get all the setup data before we can go anywhere
    // with the game
    console.log("getting setup date", this.props);
    this.props.getSetupData();
  };

  componentWillReceiveProps = props => {
    this.props = props;
    console.log("updated loader props", props);
    // Updated props and a loading state means we're ready to
    // set up a game (all the setup data has finished loading)
    if (this.state.loading) {
      this.setState({ loading: false });
      this.props.changeGameScreen("players");
    }
  };

  render = () => {
    return (
      <div>
        <div>Loading</div>
        <div>
          <CircularProgress size={60} thickness={7} />
        </div>
      </div>
    );
  };
}

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    getSetupData: () => dispatch(getSetupData()),
    changeGameScreen: screen => dispatch(changeGameScreen(screen))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
