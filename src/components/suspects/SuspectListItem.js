import React, { PureComponent } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { h2, h3, body, bodyStrong, bodyCondensed } from "../../utils/globalcss";

class SuspectListItem extends PureComponent {
  render = () => {
    const character = this.props.game.setupData.characters[
      this.props.suspectId
    ];

    return (
      <div className={suspectListItem}>
        <div>
          <img
            src={`./images/characters/${character.images.portrait}`}
            width={"100px"}
            alt={`${character.name} portrait`}
          />
        </div>
        <div>
          <div className={bodyStrong}>{`(#${character.id}) ${
            character.name
          }`}</div>
          <div className={body}>Occupation: {`${character.occupation}`}</div>
          <div className={body}>
            Relationship Status: {`${character.relationshipStatus}`}
            {character.relationshipID > 0 &&
              ` (${
                this.props.game.setupData.characters[character.relationshipID]
                  .name
              })`}
          </div>
        </div>
        {this.props.victim && 
        <div className={suspectAsVictim} />
        }
      </div>
    );
  };
}

const suspectListItem = css`
  display: flex;
  position: relative;
`;

const suspectAsVictim = css`
    background-image: url("./images/deceased_stamp.png");
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

function mapStateToProps(game) {
  return { game };
}

export default connect(mapStateToProps)(SuspectListItem);
