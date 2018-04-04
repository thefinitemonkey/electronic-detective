import React, { PureComponent } from "react";
import { connect } from "react-redux";
import SuspectList from "./SuspectList";
import Interrogation from "./Interrogation";

class Suspects extends PureComponent {
  state = { display: "list", interrogationSuspect: 0 };

  interrogateSuspect = suspectId => {
    this.setState({ display: "interrogate", interrogationSuspect: suspectId });
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
        <Interrogation suspectId={this.state.interrogationSuspect} />
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

export default connect(mapStateToProps)(Suspects);
