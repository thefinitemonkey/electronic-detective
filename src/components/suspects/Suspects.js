import React, { PureComponent } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import SuspectList from "./SuspectList";
import Interrogation from "./Interrogation";
import { h2 } from "../../utils/globalcss";

class Suspects extends PureComponent {
  state = { display: "list", interrogationSuspect: 0 };

  interrogateSuspect = suspectId => {
    this.setState({ display: "interrogate", interrogationSuspect: suspectId });
  };

  renderSuspectList = () => {
    return (
      <div>
        <div>
          <h2 className={h2}>Suspects</h2>
        </div>
        <div>
          <SuspectList interrogateSuspect={this.interrogateSuspect} />
        </div>
      </div>
    );
  };

  renderInterrogation = () => {
    return (
      <div>
        <div>
          <h2 className={h2}>{`Interrogation of ${
            this.props.game.setupData.characters[
              this.state.interrogationSuspect
            ].name
          }`}</h2>
          <div>
            <Interrogation suspectId={this.state.interrogationSuspect} />
          </div>
        </div>
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
