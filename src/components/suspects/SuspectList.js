import React, { PureComponent } from "react";
import { connect } from "react-redux";
import SuspectListItem from "./SuspectListItem";
import { css } from "emotion";
import { h2 } from "../../utils/globalcss";
import Accusation from "./Accusation";

class SuspectList extends PureComponent {
  render = () => {
    const victim = this.props.game.gameData.victim;
    return (
      <div>
        <Accusation />
        <div>
          <h2 className={h2}>Suspects</h2>
        </div>
        <div className={suspectList}>
          {this.props.suspects.map(suspect => {
            const isVictim = victim === suspect.id;
            return (
              <SuspectListItem
                key={suspect.id}
                suspectId={suspect.id}
                victim={isVictim}
                interrogateSuspect={this.props.interrogateSuspect}
              />
            );
          })}
        </div>
      </div>
    );
  };
}

const suspectList = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

function mapStateToProps(game) {
  const suspects = [];
  const keys = Object.keys(game.setupData.characters);
  keys.forEach(key => {
    suspects.push(game.setupData.characters[key]);
  });
  return { game, suspects };
}

export default connect(mapStateToProps)(SuspectList);
