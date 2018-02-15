import React, { Component } from 'react';
import Enzyme, { mount } from "enzyme";
import CharacterQuestions from "./CharacterQuestions";
import Adapter from "enzyme-adapter-react-16";




describe("CharacterQuestions", () => {
    const should = require('chai').should();
    let props;
    let testArr;
    let mountedCharacterQuestions;
    Enzyme.configure({ adapter: new Adapter() });
    const characterQuestions = () => {
        if (!mountedCharacterQuestions) {
            mountedCharacterQuestions = mount(
                <CharacterQuestions {...props} />
            );
        }
        return mountedCharacterQuestions;
    }

    beforeEach(() => {
        const questionArr = [
            {
                "id": 1,
                "subject": "murderer",
                "question": "Did the murderer go to the EAST SIDE?",
                "responseText": {
                    "affirmative": "Yes, the murderer went to the EAST side",
                    "negative": "No, the murderer went to the WEST side"
                },
                "answerFunction": "checkEastSide"
            },

            {
                "id": 2,
                "subject": "murderer",
                "question": "Did a male do it?",
                "responseText": {
                    "affirmative": "Yes, a male did it",
                    "negative": "No, a female did it"
                },
                "answerFunction": "checkMurdererGender"
            },

            {
                "id": 3,
                "subject": "murderer",
                "question": "What part of town did the murderer go to?",
                "responseText": { "affirmative": "I saw them go " },
                "answerFunction": "checkTownLocation"
            },

            {
                "id": 4,
                "subject": "victim",
                "question": "Was the murder weapon a .38?",
                "responseText": {
                    "affirmative": "Yes, the weapon was a .38",
                    "negative": "No, the weapon was a .45"
                },
                "answerFunction": "checkMurderWeapon"
            },

            {
                "id": 5,
                "subject": "weapon",
                "question": "Where was the .38 hidden?",
                "responseText": { "affirmative": "The .38 was hidden at the " },
                "answerFunction": "check38Location"
            }];

        props = {
            questions: questionsArr
        };
        mountedCharacterQuestions = undefined;
    })

    it("contains five questions", () => {
        const divs = characterQuestions().find(".Question");
        divs.length.should.equal(5);
    });

});