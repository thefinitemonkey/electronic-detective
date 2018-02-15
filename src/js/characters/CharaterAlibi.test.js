import React, { Component } from 'react';
import Enzyme, { mount } from "enzyme";
import CharacterAlibi from "./CharacterAlibi";
import Adapter from "enzyme-adapter-react-16";




describe("CharacterAlibi", () => {
    let props;
    let testArr;
    let mountedCharacterAlibi;
    Enzyme.configure({ adapter: new Adapter() });
    const characterAlibi = () => {
        if (!mountedCharacterAlibi) {
            mountedCharacterAlibi = mount(
                <CharacterAlibi {...props} />
            );
        }
        return mountedCharacterAlibi;
    }

    beforeEach(() => {
        const locData = {
            attendees: {
                men: [{ name: "A" }, { name: "B" }],
                women: [{ name: "C" }, { name: "D" }]
            },
            address: { side: "East", town: "Uptown" },
            name: "Little Tony's Pizzaria and Shoes"
        };

        props = {
            characterData: { location: locData },
            selectedFacts: []
        };
        mountedCharacterAlibi = undefined;
    })

    for (let i = 0; i < 15; i++) {
        it("contains no fewer than one and no more than three facts", () => {
            const divs = characterAlibi().find(".Character-alibifact");
            expect(divs.length).toBeGreaterThanOrEqual(1);
            expect(divs.length).toBeLessThanOrEqual(3);
        }
        )
    };

    testArr = [{
        selectedFacts: ["side", "town", "location"],
        results: ["I was on the", "I was in the", "I was at the"]
    },
    {
        selectedFacts: ["suspect", "suspect"],
        results: ["I was with", "I was with"]
    },
    {
        selectedFacts: ["town", "suspect", "location"],
        results: ["I was in the", "I was with", "I was at the"]
    }];
    
    for (let test in testArr) {
        it("gives the correct responses for each fact type", () => {
            // Check that the correct number of facts is rendered for the
            // number of fact selections provided
            props.selectedFacts = testArr[test].selectedFacts;
            const divs = characterAlibi().find(".Character-alibifact");
            expect(divs.length).toBe(testArr[test].selectedFacts.length);
            // Check that the beginning of each fact statement matches the
            // start expected for each type requested
            for (let i = 0; i < testArr[test].results.length; i++) {
                const child = divs.get(i).props.children;
                const expected = testArr[test].results[i];
                expect(child.includes(expected)).toBe(true);
            }
        })
    }
});