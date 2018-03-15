import React, { Component } from 'react';
import Enzyme, { mount } from "enzyme";
import CharacterAnswerLogic from "./CharacterAnswerLogic";
import Adapter from "enzyme-adapter-react-16";




describe("CharacterAnswerLogic", () => {
    const should = require('chai').should();
    let props;
    let testArr;
    Enzyme.configure({ adapter: new Adapter() });
    let data;

    beforeEach(() => {
        data = {
            characterData: {
                location: {
                    address: {
                        side: "West",
                        town: "Uptown"
                    },
                    id: "E",
                    weapon: {type: ".38", print: 9}
                },
                weapon: { type: ".38" },
                gender: "M"
            },
            murdererData: {
                location: {
                    address: {
                        side: "East",
                        town: "Downtown"
                    },
                    id: "A",
                    weapon: {type: null}
                },
                gender: "M"
            },
            weaponData: [
                { type: ".38", location: { name: "A" } },
                { type: ".45", location: { name: "B" } }
            ],
            locationData: [
                { attendees: { men: ["A", "B"], women: ["C", "D"] }, name: "1" },
                { attendees: { men: [], women: ["E"] }, name: "2" },
                { attendees: { men: ["F", "G"], women: ["H", "I"] }, name: "3" },
                { attendees: { men: ["J", "K"], women: ["L", "M"] }, name: "4" },
                { attendees: { men: ["N", "O"], women: ["P"] }, name: "5" },
                { attendees: { men: ["Q", "R"], women: ["S", "T"] }, name: "6" }
            ]
        }
    })

    // Test suspect side of city
    it("says the suspect is not on the east side", () => {
        const response = { affirmative: "Yes", negative: "No" };
        CharacterAnswerLogic.checkEastSide(data, "suspect", response).answer.should.equal("No");
    });

    // Test murderer side of city
    it("says the murderer is on the east side", () => {
        const response = { affirmative: "Yes", negative: "No" };
        CharacterAnswerLogic.checkEastSide(data, "murderer", response).answer.should.equal("Yes");
    });

    // Check that the murderer is Male, then switch to Female and check again
    it("says the murderer is male", () => {
        const response = { affirmative: "Yes", negative: "No" };
        CharacterAnswerLogic.checkMurdererGender(data, "murderer", response).answer.should.equal("Yes");
        data.murdererData.gender = "F";
        CharacterAnswerLogic.checkMurdererGender(data, "murderer", response).answer.should.equal("No");
    });

    // Test suspect area of city
    it("says the suspect is Uptown", () => {
        const response = { affirmative: "Yes ", negative: "No " };
        CharacterAnswerLogic.checkTownLocation(data, "suspect", response).answer.should.equal("Yes Uptown");
    });

    // Test murderer area of city
    it("says the murderer is Downtown", () => {
        const response = { affirmative: "Yes ", negative: "No " };
        CharacterAnswerLogic.checkTownLocation(data, "murderer", response).answer.should.equal("Yes Downtown");
    });

    // Test the type of weapon as .38 and then as .45
    it("says the weapon is a .38", () => {
        const response = { affirmative: "Yes .38", negative: "No .45" };
        CharacterAnswerLogic.checkMurderWeapon(data, "weapon", response).answer.should.equal("Yes .38");
        data.characterData.weapon.type = ".45";
        CharacterAnswerLogic.checkMurderWeapon(data, "weapon", response).answer.should.equal("No .45");
    });

    // Test location of the .38
    it("says the .38 is at A", () => {
        const response = { affirmative: "Yes ", negative: "No " };
        CharacterAnswerLogic.check38Location(data, "weapon", response).answer.should.equal("Yes A");
    });

    // Test location of the .45
    it("says the .45 is at B", () => {
        const response = { affirmative: "Yes ", negative: "No " };
        CharacterAnswerLogic.check45Location(data, "weapon", response).answer.should.equal("Yes B");
    });

    // Test the location that has only three suspects
    it("says that 5 has three suspects", () => {
        const response = { affirmative: "Yes ", negative: "No " };
        CharacterAnswerLogic.checkEmptySeat(data, "suspect", response).answer.should.equal("Yes 5");
    });

    // Test suspect is in A, B, or C
    it("says the suspect is not in A/B/C", () => {
        const response = { affirmative: "Yes", negative: "No" };
        CharacterAnswerLogic.checkPlaceNames(data, "suspect", response).answer.should.equal("No");
    });

    // Test murderer is in A, B, or C
    it("says the murderer is in A/B/C", () => {
        const response = { affirmative: "Yes", negative: "No" };
        CharacterAnswerLogic.checkPlaceNames(data, "murderer", response).answer.should.equal("Yes");
    });

    // Test suspect is with a weapon
    it("says the suspect is with a weapon", () => {
        const response = { affirmative: "Yes", negative: "No" };
        CharacterAnswerLogic.checkWeaponLocation(data, "suspect", response).answer.should.equal("Yes");
        data.characterData.location.weapon.type = null;
        CharacterAnswerLogic.checkWeaponLocation(data, "suspect", response).answer.should.equal("No");
    });

    // Test suspect says prints are odd
    it("says the weapon has odd numbered print", () => {
        const response = { affirmative: "Yes", negative: "No", unknown: "??" };
        CharacterAnswerLogic.checkPrints(data, ".38", response).answer.should.equal("Yes");
        data.characterData.location.weapon.print = 10;
        CharacterAnswerLogic.checkPrints(data, ".38", response).answer.should.equal("No");
        CharacterAnswerLogic.checkPrints(data, ".45", response).answer.should.equal("??");
        data.characterData.location.weapon.type = null;
        CharacterAnswerLogic.checkPrints(data, ".38", response).answer.should.equal("??");
    });
});