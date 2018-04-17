import React, { PureComponent } from "react";
import Tabs, { Tab } from "material-ui/Tabs";
import { connect } from "react-redux";
import { css } from "react-emotion";
import CaseSheet from "./casesheet/CaseSheet";
import Suspects from "./suspects/Suspects";
import { endPlayerTurn } from "../actions/index";
import Button from "material-ui/Button";

class Investigation extends PureComponent {
  state = { displayEndTurn: false, tabSelection: 0 };

  handleEndTurn = () => {
    this.setState({ displayEndTurn: false });
    this.props.endPlayerTurn();
  };

  handleEndTurnDisplay = () => {
    this.setState({ displayEndTurn: true });
  };

  handleTabSelection = (event, value) => {
    this.setState({ tabSelection: value });
  };

  render = () => {
    return (
      <div className={investigationSpace}>
        <Tabs value={this.state.tabSelection} onChange={this.handleTabSelection}>
          <Tab label={`Case Sheet`} />
          <Tab label={`Suspects`} />
        </Tabs>
        <div>
          {this.state.tabSelection === 0 && <CaseSheet />}
          {this.state.tabSelection === 1 && (
            <Suspects handleEndTurnDisplay={this.handleEndTurnDisplay} />
          )}
        </div>
        {this.state.displayEndTurn && (
          <div className={endTurnDisplay}>
            <div className={buttonDisplay}>
              <Button
                variant="raised"
                /*backgroundColor="#a4c639"
                labelColor={"#fff"}*/
                onClick={e => this.handleEndTurn()}
              >End Turn</Button>
            </div>
          </div>
        )}
      </div>
    );
  };
}

const investigationSpace = css`
  padding-bottom: 50px;
`;

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
  margin-left: -18px;
`;

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    endPlayerTurn: () => dispatch(endPlayerTurn())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Investigation);
