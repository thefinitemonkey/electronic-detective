import React from "react";
import { mount } from "enzyme";
import { Facts } from "./Facts";
import { createMount } from "material-ui/test-utils";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "proptypes";
import { testStore } from "../../utils/teststore";

Enzyme.configure({ adapter: new Adapter() });

describe("Facts", () => {
  let mountedFacts;
  let store;
  let options;
  let props;
  const materialMount = createMount();

  beforeAll(() => {
    store = testStore;

    options = {
      context: { store },
      childContextTypes: { store: PropTypes.object.isRequired }
    };

    props = {
      playerId: 2,
      game: store.getState(),
      updatePlayerClues: jest.fn()
    };

    mountedFacts = materialMount(<Facts {...props} />, options);
    //console.log("Facts -- ", mountedFacts.debug());
  });

  afterAll(() => {
    materialMount.cleanUp();
  });

  // All tests will go here
  describe("the Facts", () => {
    it("always renders Facts as the first element", () => {
      expect(mountedFacts.first().type()).toBe(Facts);
    });

    it("component contains everything else that gets rendered", () => {
      const divs = mountedFacts.find("Facts");
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // Enzyme omits the outermost node when using the .children()
      // method on addressField(). This is annoying, but we can use it
      // to verify that wrappingDiv contains everything else this
      // component renders.
      expect(wrappingDiv.children()).toEqual(mountedFacts.children());
    });

    it("initializes component state", () => {
      expect(mountedFacts.state()).toMatchObject({
        locationKeys: ["A", "C", "D", "F"],
        playerId: 2
      });
    });

    it("renders a RadioGroup for murdererSex", () => {
      expect(mountedFacts.find("RadioGroup[name='murdererSex']").length).toBe(
        1
      );
    });

    it("renders a RadioGroup for murdererSide", () => {
      expect(mountedFacts.find("RadioGroup[name='murdererSide']").length).toBe(
        1
      );
    });

    it("renders a RadioGroup for murdererTown", () => {
      expect(mountedFacts.find("RadioGroup[name='murdererTown']").length).toBe(
        1
      );
    });

    it("renders a RadioGroup for murdererWeapon", () => {
      expect(
        mountedFacts.find("RadioGroup[name='murdererWeapon']").length
      ).toBe(1);
    });

    it("renders a RadioGroup for 38Prints", () => {
      expect(mountedFacts.find("RadioGroup[name='38Prints']").length).toBe(1);
    });

    it("renders a RadioGroup for 45Prints", () => {
      expect(mountedFacts.find("RadioGroup[name='45Prints']").length).toBe(1);
    });

    it("calls updatePlayerClues with correct data for murdererSex changes", () => {
      const input = mountedFacts.find("input[name='murdererSex']").first();
      input.simulate("change", { target: { checked: true, value: "male" } });
      expect(props.updatePlayerClues.mock.calls.length > 0);
      expect(props.updatePlayerClues.mock.calls[0][0]).toBe(2);
      expect(props.updatePlayerClues.mock.calls[0][1].clueSelections.sex).toBe(
        "male"
      );
    });

    it("calls updatePlayerClues with correct data for murdererSide changes", () => {
        const input = mountedFacts.find("input[name='murdererSide']").first();
        input.simulate("change", { target: { checked: true, value: "west" } });
        expect(props.updatePlayerClues.mock.calls.length > 0);
        expect(props.updatePlayerClues.mock.calls[1][0]).toBe(2);
        expect(props.updatePlayerClues.mock.calls[1][1].clueSelections.hiding.side).toBe(
          "west"
        );
      });

      it("calls updatePlayerClues with correct data for murdererTown changes", () => {
        const input = mountedFacts.find("input[name='murdererTown']").first();
        input.simulate("change", { target: { checked: true, value: "midtown" } });
        expect(props.updatePlayerClues.mock.calls.length > 0);
        expect(props.updatePlayerClues.mock.calls[2][0]).toBe(2);
        expect(props.updatePlayerClues.mock.calls[2][1].clueSelections.hiding.town).toBe(
          "midtown"
        );
      });

      it("calls updatePlayerClues with correct data for murdererWeapon changes", () => {
        const input = mountedFacts.find("input[name='murdererWeapon']").first();
        input.simulate("change", { target: { checked: true, value: ".45" } });
        expect(props.updatePlayerClues.mock.calls.length > 0);
        expect(props.updatePlayerClues.mock.calls[3][0]).toBe(2);
        expect(props.updatePlayerClues.mock.calls[3][1].clueSelections.weapons.used).toBe(
          ".45"
        );
      });

      it("calls updatePlayerClues with correct data for 38Prints changes", () => {
        const input = mountedFacts.find("input[name='38Prints']").first();
        const sampleSex = props.game.gameData.sheets[2].clueSelections.sex;
        input.simulate("change", { target: { checked: true, value: "even" } });
        expect(props.updatePlayerClues.mock.calls.length > 0);
        expect(props.updatePlayerClues.mock.calls[4][0]).toBe(2);
        expect(props.updatePlayerClues.mock.calls[4][1].clueSelections.weapons[".38"].fingerprint).toBe(
          "even"
        );
      });

      it("calls updatePlayerClues with correct data for 45Prints changes", () => {
        const input = mountedFacts.find("input[name='45Prints']").first();
        const sampleSex = props.game.gameData.sheets[2].clueSelections.sex;
        input.simulate("change", { target: { checked: true, value: "odd" } });
        expect(props.updatePlayerClues.mock.calls.length > 0);
        expect(props.updatePlayerClues.mock.calls[5][0]).toBe(2);
        expect(props.updatePlayerClues.mock.calls[5][1].clueSelections.weapons[".45"].fingerprint).toBe(
          "odd"
        );
      });
            });
});
