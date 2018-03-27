import React, { PureComponent } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import SuspectList from "./SuspectList";
import { h2 } from "../../utils/globalcss";

class Suspects extends PureComponent {
  render = () => {
    return (
      <div>
        <div>
          <h2 className={h2}>Suspects</h2>
        </div>
        <div>
          <SuspectList />
        </div>
      </div>
    );
  };
}

function mapStateToProps(game) {
  return { game };
}

export default connect(mapStateToProps)(Suspects);
