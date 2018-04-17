import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getSetupData, changeGameScreen } from "../actions/index";
import {CircularProgress} from "material-ui/Progress";
import { css } from "react-emotion";
import { h2 } from "../utils/globalcss";

class Loader extends PureComponent {
  state = {
    loading: true,
    numPlayers: 1
  };

  componentDidMount = () => {
    // Need to get all the setup data before we can go anywhere
    // with the game
    this.props.getSetupData();
  };

  componentWillReceiveProps = props => {
    this.props = props;
    // Updated props and a loading state means we're ready to
    // set up a game (all the setup data has finished loading)
    if (this.state.loading) {
      this.setState({ loading: false });
      this.props.changeGameScreen("players");
    }
  };

  render = () => {
    return (
      <div className={centeredHorz}>
        <div className={centeredVert}>
          <div className={topSpace} />
          <div className={middleSpace}>
            <div>
              <h2 className={[h2, loadingText].join(" ")}>Loading</h2>
            </div>
            <div>
              <CircularProgress size={60} thickness={7} />
            </div>
          </div>
          <div className={bottomSpace} />
        </div>
      </div>
    );
  };
}

const centeredHorz = css`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-height: 300px;
`;

const centeredVert = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const topSpace = css`
  flex: 1;
`;

const middleSpace = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 3;
`;

const bottomSpace = css`
  flex: 2;
`;

const loadingText = css`
  font-size: 32px;
  margin-bottom: 25px;
`;

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
