import React, { PureComponent } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Tabs, Tab } from "material-ui/Tabs";
import { connect } from "react-redux";
import CaseSheet from "./CaseSheet";
import Suspects from "./Suspects";

class Interrogation extends PureComponent {
  render = () => {
    return (
      <div>
        <Tabs>
          <Tab label={`Case Sheet`}>
            <CaseSheet />
          </Tab>
          <Tab label={`Suspects`}>
            <Suspects />
          </Tab>
        </Tabs>
      </div>
    );
  };
}

function mapStateToProps(game) {
  return { game };
}

export default connect(mapStateToProps)(Interrogation);
