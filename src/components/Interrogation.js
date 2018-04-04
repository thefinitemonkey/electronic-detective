import React, { PureComponent } from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import { connect } from "react-redux";
import { css } from "react-emotion";
import CaseSheet from "./casesheet/CaseSheet";
import Suspects from "./suspects/Suspects";
import { h1 } from "../utils/globalcss";
import { endPlayerTurn } from "../actions/index";
import RaisedButton from "material-ui/RaisedButton";

class Interrogation extends PureComponent {
  state = { displayEndTurn: false };

  handleEndTurn = () => {
    this.setState({ displayEndTurn: false });
    this.props.endPlayerTurn();
  };

  handleEndTurnDisplay = () => {
    this.setState({ displayEndTurn: true });
  };

  render = () => {
    return (
      <div>
        <h1 className={h1}>Interrogation</h1>
        <Tabs>
          <Tab label={`Case Sheet`}>
            <CaseSheet />
          </Tab>
          <Tab label={`Suspects`}>
            <Suspects handleEndTurnDisplay={this.handleEndTurnDisplay} />
          </Tab>
        </Tabs>
        {this.state.displayEndTurn && (
          <div className={endTurnDisplay}>
            <div className={buttonDisplay}>
              <RaisedButton
                label="End Turn"
                backgroundColor="#a4c639"
                labelColor={"#fff"}
                onClick={e => this.handleEndTurn()}
              />
            </div>
          </div>
        )}
      </div>
    );
  };
}

const buttonDisplay = css`
  margin-right: 20px;
`;

const endTurnDisplay = css`
  display: flex;
  justify-content: flex-end;
  background-color: #94b231;
  height: 60px;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-left: -8px;
`;

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    endPlayerTurn: () => dispatch(endPlayerTurn())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Interrogation);
