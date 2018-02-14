import React, { Component } from 'react';
import Enzyme, { mount } from "enzyme";
import CharacterAlibi from "./CharacterAlibi";
import Adapter from "enzyme-adapter-react-16";




describe("CharacterAlibi", () => {
    let props;
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

        props = { characterData: { location: locData } };
        mountedCharacterAlibi = undefined;
    })

    for (let i = 0; i < 15; i++) {
        it("contains no fewer than one and no more than three facts", () => {
            const divs = characterAlibi().find(".Character-alibifact");
            expect(divs.length).toBeGreaterThanOrEqual(1);
            expect(divs.length).toBeLessThanOrEqual(3);
        }
    )};
});