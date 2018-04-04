import React, { PureComponent } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import { connect } from "react-redux";
import CaseSheet from "./casesheet/CaseSheet";
import Suspects from "./suspects/Suspects";
import { h1 } from "../utils/globalcss";

class Interrogation extends PureComponent {
  render = () => {
    return (
      <div>
        <h1 className={h1}>Interrogation</h1>
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
