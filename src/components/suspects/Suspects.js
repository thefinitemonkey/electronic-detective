import React, { PureComponent } from "react";
import { connect } from "react-redux";
import SuspectList from "./SuspectList";
import Interrogation from "./Interrogation";
import { updateTurnData } from "../../actions/index";

class Suspects extends PureComponent {
  state = {
    display: this.props.game.turn.display,
    interrogationSuspect: this.props.game.turn.interrogationSuspect
  };

  interrogateSuspect = suspectId => {
    this.setState({ display: "interrogate", interrogationSuspect: suspectId });
    this.props.updateTurnData({
      display: "interrogate",
      interrogationSuspect: suspectId
    });
  };

  renderSuspectList = () => {
    return (
      <div>
        <SuspectList interrogateSuspect={this.interrogateSuspect} />
      </div>
    );
  };

  renderInterrogation = () => {
    return (
      <div>
        <Interrogation
          suspectId={this.state.interrogationSuspect}
          handleEndTurnDisplay={this.props.handleEndTurnDisplay}
        />
      </div>
    );
  };

  render = () => {
    return (
      <div>
        {this.state.display === "list"
          ? this.renderSuspectList()
          : this.renderInterrogation()}
      </div>
    );
  };
}

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTurnData: data => dispatch(updateTurnData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Suspects);
