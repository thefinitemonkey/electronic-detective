import React, { PureComponent } from "react";
import { connect } from "react-redux";
import SuspectListItem from "./SuspectListItem";

class SuspectList extends PureComponent {
  render = () => {
    const victim = this.props.game.gameData.victim;
    return (
      <div>
        {this.props.suspects.map(suspect => {
          const isVictim = victim === suspect.id;
          return (
            <SuspectListItem
              key={suspect.id}
              suspectId={suspect.id}
              victim={isVictim}
            />
          );
        })}
      </div>
    );
  };
}

function mapStateToProps(game) {
  const suspects = [];
  const keys = Object.keys(game.setupData.characters);
  keys.forEach(key => {
    suspects.push(game.setupData.characters[key]);
  });
  return { game, suspects };
}

export default connect(mapStateToProps)(SuspectList);
