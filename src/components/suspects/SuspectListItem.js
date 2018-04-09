import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { body, bodyStrong } from "../../utils/globalcss";

class SuspectListItem extends PureComponent {
  state = { questionsVisible: false };

  toggleQuestions = e => {
    e.preventDefault();
    this.setState({ questionsVisible: !this.state.questionsVisible });
  };

  interrogate = e => {
    e.preventDefault();
    this.props.interrogateSuspect(this.props.suspectId);
  };

  render = () => {
    const character = this.props.game.setupData.characters[
      this.props.suspectId
    ];

    return (
      <div className={suspectListItem}>
        <div className={suspectPortrait}>
          <img
            className={suspectPortraitImage}
            src={`./images/characters/${character.images.portrait}`}
            alt={`${character.name} portrait`}
          />
        </div>
        <div>
          <div className={bodyStrong}>{`${character.name} (#${
            character.id
          })`}</div>
          <div className={body}>Occupation: {`${character.occupation}`}</div>
          <div className={body}>
            Relationship Status: {`${character.relationshipStatus}`}
            {character.relationshipID > 0 &&
              ` (${
                this.props.game.setupData.characters[character.relationshipID]
                  .name
              })`}
          </div>
          <div className={extraInfoLinks}>
            <a
              className={[body, extraInfoLink].join(" ")}
              href="#/displayAvailableQuestions"
              onClick={e => this.toggleQuestions(e)}
            >
              Available questions
            </a>
            <a
              className={[body, extraInfoLink].join(" ")}
              href="#/interrogate"
              onClick={e => this.interrogate(e)}
            >
              Interrogate
            </a>
          </div>
          {this.state.questionsVisible && (
            <div className={availableQuestions}>
            <ul className={questionsUl}>
              {character.availableQuestions.map(qId => {
                return (
                  <li
                    className={[body, question, questionsLi].join(" ")}
                    key={`${this.props.suspectId}-q${qId}`}
                  >
                    {this.props.game.setupData.questions[qId].question}
                  </li>
                );
              })}
              </ul>
            </div>
          )}
        </div>
        {this.props.victim && <div className={suspectAsVictim} />}
      </div>
    );
  };
}

const suspectListItem = css`
  display: flex;
  position: relative;
  margin-bottom: 20px;
  min-width: 380px;
`;

const suspectPortrait = css`
  margin-right: 20px;
`;

const suspectPortraitImage = css`
  width: 75px;
`;

const suspectAsVictim = css`
  background-image: url("./images/deceased_stamp.png");
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const availableQuestions = css`
  padding-top: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
  border-top: 1px solid #ddd;
  max-width: 265px;
`;

const questionsUl = css`
  padding-left: 16px;
  margin: 5px 0px 0px 0px;
`

const questionsLi = css`
  margin-bottom: 3px;
`

const extraInfoLinks = css`
  margin-top: 5px;
  display: flex;
  justify-content: flex-left;
`;

const extraInfoLink = css`
  text-decoration: none;
  color: blue;
  font-size: 12px;
  margin-right: 20px;
`;

const question = css`
  font-size: 13px;
`;

function mapStateToProps(game) {
  return { game };
}

export default connect(mapStateToProps)(SuspectListItem);
