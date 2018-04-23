import React from "react";
import { mount } from "enzyme";
import ConnectedFacts, { Facts } from "./Facts";
import { createMount } from "material-ui/test-utils";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "proptypes";
import { testStore } from "../../utils/teststore_alt";
import configureMockStore from "redux-mock-store";
import { UPDATE_PLAYER_CLUES } from "../../actions";

Enzyme.configure({ adapter: new Adapter() });

describe("Facts", () => {
  let mountedFacts;
  let mountedConnectedFacts;
  let store;
  let options;
  let props;
  let connectedProps;
  const materialMount = createMount();
  const connectedMaterialMount = createMount();
  const mockStore = configureMockStore();

  beforeAll(() => {
    store = mockStore(testStore);

    options = {
      context: { store },
      childContextTypes: { store: PropTypes.object.isRequired }
    };

    props = {
      playerId: 2,
      game: store.getState(),
      updatePlayerClues: jest.fn()
    };

    connectedProps = {
      playerId: 2
    };

    mountedConnectedFacts = connectedMaterialMount(
      <ConnectedFacts {...connectedProps} />,
      options
    );
    mountedFacts = materialMount(<Facts {...props} />, options);
    //console.log("Facts -- ", mountedFacts.debug());
  });

  afterAll(() => {
    materialMount.cleanUp();
    connectedMaterialMount.cleanUp();
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
      expect(
        mountedConnectedFacts.find("RadioGroup[name='murdererSex']").length
      ).toBe(1);
    });

    it("renders a RadioGroup for murdererSide", () => {
      expect(
        mountedConnectedFacts.find("RadioGroup[name='murdererSide']").length
      ).toBe(1);
    });

    it("renders a RadioGroup for murdererTown", () => {
      expect(
        mountedConnectedFacts.find("RadioGroup[name='murdererTown']").length
      ).toBe(1);
    });

    it("renders a RadioGroup for murdererWeapon", () => {
      expect(
        mountedConnectedFacts.find("RadioGroup[name='murdererWeapon']").length
      ).toBe(1);
    });

    it("renders a RadioGroup for 38Prints", () => {
      expect(
        mountedConnectedFacts.find("RadioGroup[name='38Prints']").length
      ).toBe(1);
    });

    it("renders a RadioGroup for 45Prints", () => {
      expect(
        mountedConnectedFacts.find("RadioGroup[name='45Prints']").length
      ).toBe(1);
    });

    it("calls updatePlayerClues with correct data for murdererSex changes", () => {
      const input = mountedConnectedFacts
        .find("input[name='murdererSex']")
        .first();
      input.simulate("change", { target: { checked: true, value: "male" } });
      const action = store.getActions();
      expect(action[0].type).toBe(UPDATE_PLAYER_CLUES);
      expect(action[0].sheet.clueSelections.sex).toBe("male");
    });

    it("calls updatePlayerClues with correct data for murdererSide changes", () => {
      const input = mountedConnectedFacts
        .find("input[name='murdererSide']")
        .first();
      input.simulate("change", { target: { checked: true, value: "west" } });
      const action = store.getActions();
      expect(action[1].type).toBe(UPDATE_PLAYER_CLUES);
      expect(action[1].sheet.clueSelections.hiding.side).toBe("west");
    });

    it("calls updatePlayerClues with correct data for murdererTown changes", () => {
      const input = mountedConnectedFacts.find("input[name='murdererTown']").first();
      input.simulate("change", { target: { checked: true, value: "midtown" } });
      const action = store.getActions();
      expect(action[2].type).toBe(UPDATE_PLAYER_CLUES);
      expect(action[2].sheet.clueSelections.hiding.town).toBe("midtown");
    });

    it("calls updatePlayerClues with correct data for murdererWeapon changes", () => {
      const input = mountedConnectedFacts.find("input[name='murdererWeapon']").first();
      input.simulate("change", { target: { checked: true, value: ".45" } });
      const action = store.getActions();
      expect(action[3].type).toBe(UPDATE_PLAYER_CLUES);
      expect(action[3].sheet.clueSelections.weapons.used).toBe(".45");
    });

    it("calls updatePlayerClues with correct data for 38Prints changes", () => {
      const input = mountedConnectedFacts.find("input[name='38Prints']").first();
      input.simulate("change", { target: { checked: true, value: "even" } });
      const action = store.getActions();
      expect(action[4].type).toBe(UPDATE_PLAYER_CLUES);
      expect(action[4].sheet.clueSelections.weapons[".38"].fingerprint).toBe("even");
    });

    it("calls updatePlayerClues with correct data for 45Prints changes", () => {
      const input = mountedConnectedFacts.find("input[name='45Prints']").first();
      input.simulate("change", { target: { checked: true, value: "odd" } });
      const action = store.getActions();
      expect(action[5].type).toBe(UPDATE_PLAYER_CLUES);
      expect(action[5].sheet.clueSelections.weapons[".45"].fingerprint).toBe("odd");
    });
  });
});
