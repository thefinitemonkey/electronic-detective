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

    it("calls updatePlayerClues with correct data when selection changes", () => {
      const input = mountedFacts.find("input[name='murdererSex']").first();
      const sampleSex = props.game.gameData.sheets[2].clueSelections.sex;
      input.simulate("change", { target: { checked: true, value: "male" } });
      expect(props.updatePlayerClues.mock.calls.length > 0);
      expect(props.updatePlayerClues.mock.calls[0][0]).toBe(2);
      expect(props.updatePlayerClues.mock.calls[0][1].clueSelections.sex).toBe(
        "male"
      );
    });
  });
});
