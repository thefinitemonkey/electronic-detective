import React from "react";
import { mount } from "enzyme";
import { createMount } from "material-ui/test-utils";
import { AddressField } from "./AddressField";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "proptypes";
import { testStore } from "../../utils/teststore";

Enzyme.configure({ adapter: new Adapter() });
//const muiTheme = getMuiTheme(baseTheme);

describe("AddressField", () => {
  let store;
  let props;
  let options;
  const materialMount = createMount();

  let mountedAddressField;

  beforeAll(() => {
    store = testStore;

    options = {
      context: { store },
      childContextTypes: { store: PropTypes.object.isRequired }
    };

    props = {
      locationId: "C",
      area: "side",
      updateLocationAddress: jest.fn(),
      hint: "Side of town",
      fieldId: "sideOfTownField",
      game: store.getState()
    };

    mountedAddressField = materialMount(<AddressField {...props} />, options);
    //console.log("mountedAddressField -- ", mountedAddressField.find("AddressField").type());
  });

  beforeEach(() => {
    //mountedAddressField = undefined;
  });

  afterAll(() => {
    materialMount.cleanUp();
  });

  // All tests will go here
  describe("the AddressField", () => {
    it("always renders AddressField as the root element", () => {
      expect(mountedAddressField.first().type()).toBe(AddressField);
    });

    it("component contains everything else that gets rendered", () => {
      const divs = mountedAddressField.find("AddressField");
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // Enzyme omits the outermost node when using the .children()
      // method on addressField(). This is annoying, but we can use it
      // to verify that wrappingDiv contains everything else this
      // component renders.
      expect(wrappingDiv.children()).toEqual(mountedAddressField.children());
    });

    it("initializes field value as empty", () => {
      const input = mountedAddressField.find("input");
      expect(input.value).toBe("" || undefined);
    });

    it("calls updateState and updates state on change", () => {
      const input = mountedAddressField.find("input");
      input.simulate("change", { target: { value: "east" } });
      expect(mountedAddressField.state().address).toBe("east");
    });

    it("calls the updateAddress function on blur", () => {
      const input = mountedAddressField.find("input");

      input.simulate("change", { target: { value: "east" } });
      input.simulate("blur");
      expect(props.updateLocationAddress.mock.calls.length > 0);
      expect(props.updateLocationAddress.mock.calls[0][0]).toBe(2);
      expect(props.updateLocationAddress.mock.calls[0][1]).toBe("C");
      expect(props.updateLocationAddress.mock.calls[0][2]).toBe("side");
      expect(props.updateLocationAddress.mock.calls[0][3]).toBe("east");
    });
  });

  describe("the input field", () => {});
});
