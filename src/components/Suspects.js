import React, { PureComponent } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";

class Suspects extends PureComponent {
  render = () => {
    return (
      <div>
        Suspects
      </div>
    );
  };
}

function mapStateToProps(game) {
  return { game };
}

export default connect(mapStateToProps)(Suspects);
