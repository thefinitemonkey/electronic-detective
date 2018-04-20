import React from "react";
import { mount } from "enzyme";
import { Location } from "./Location";
import { createMount } from "material-ui/test-utils";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "proptypes";
import { testStore } from "../../utils/teststore";

Enzyme.configure({ adapter: new Adapter() });

describe("Location", () => {
  let mountedLocation;
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
      updatePlayerClues: jest.fn(),
      locationId: "C"
    };

    mountedLocation = materialMount(<Location {...props} />, options);
    //console.log("Location -- ", mountedLocation.debug());
  });

  afterAll(() => {
    materialMount.cleanUp();
  });

  // All tests will go here
  describe("the Location", () => {
    it("always renders Location as the first element", () => {
      expect(mountedLocation.first().type()).toBe(Location);
    });

    it("component contains everything else that gets rendered", () => {
      const divs = mountedLocation.find("Location");
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // Enzyme omits the outermost node when using the .children()
      // method on addressField(). This is annoying, but we can use it
      // to verify that wrappingDiv contains everything else this
      // component renders.
      expect(wrappingDiv.children()).toEqual(mountedLocation.children());
    });

    it("initializes component state", () => {
      expect(mountedLocation.state()).toMatchObject({
        weapon: ""
      });
    });

    it("renders four Occupant fields", () => {
      expect(mountedLocation.find("input [id^='C-men-']").length).toBe(2);
      expect(mountedLocation.find("input [id^='C-women-']").length).toBe(2);
    });

    it("renders one address side field", () => {
      expect(mountedLocation.find("input[id='C-side']").length).toBe(1);
    });

    it("renders one address town field", () => {
      expect(mountedLocation.find("input[id='C-town']").length).toBe(1);
    });

    it("renders one weapon field", () => {
      expect(mountedLocation.find("input[id='C-weapon']").length).toBe(1);
    });

    it("calls updatePlayerClues with correct data when entry changes", () => {
      const input = mountedLocation.find("input[id='C-weapon']");
      input.simulate("change", { target: { value: ".38" } });
      input.simulate("blur");
      expect(props.updatePlayerClues.mock.calls.length > 0);
      expect(props.updatePlayerClues.mock.calls[0][0]).toBe(2);
      expect(
        props.updatePlayerClues.mock.calls[0][1].locations[props.locationId]
          .weapon
      ).toBe(".38");
    });
  });
});
