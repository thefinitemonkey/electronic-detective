import React from "react";
import { mount } from "enzyme";
import { createMount } from "material-ui/test-utils";
import AddressField from "./AddressField";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "proptypes";

Enzyme.configure({ adapter: new Adapter() });

describe("AddressField", () => {
  let store;
  let context;
  let props;
  let options;
  let mountedAddressField;
  let materialMount;
  const addressField = () => {
    if (!mountedAddressField) {
      mountedAddressField = materialMount(<AddressField {...props} />, options);
    }
    return mountedAddressField;
  };

  beforeAll(() => {
    materialMount = createMount();
  });

  beforeEach(() => {
    store = {
      subscribe: () => {},
      dispatch: () => {},
      getState: () => ({
        playerId: 2,
        gameData: {
          sheets: {
            2: {
              locations: {
                C: {
                  address: { side: "", town: "" }
                }
              }
            }
          }
        }
      })
    };

    options = {
      context: { store },
      childContextTypes: { store: PropTypes.object.isRequired }
    };

    props = {
      locationId: "C",
      area: "side",
      updateLocationAddress: jest.fn()
    };
    mountedAddressField = undefined;
  });

  afterAll(() => {
    materialMount.cleanUp();
  });

  // All tests will go here
  it("always renders a div", () => {
    const divs = addressField().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = addressField().find("div");
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // Enzyme omits the outermost node when using the .children()
      // method on addressField(). This is annoying, but we can use it
      // to verify that wrappingDiv contains everything else this
      // component renders.
      expect(wrappingDiv.children()).toEqual(addressField().children());
    });
  });

  describe("the input field", () => {
    it("calls updateState and updates state on change", () => {
      const field = addressField().find("input");
      field.simulate("change", { target: { value: "east" } });
      expect(field.state().value.toBe("east"));
    });

    it("calls the updateAddress function on blur", () => {
      const field = addressField().find("input");
      field.simulate("change", { target: { value: "east" } });
      field.simulate("blur");
      expect(props.updateLocationAddress.mock.calls.length > 0);
      expect(props.updateLocationAddress.mock.calls[0][0].toBe(0));
      expect(props.updateLocationAddress.mock.calls[0][1].toBe(2));
      expect(props.updateLocationAddress.mock.calls[0][2].toBe(1));
    });
  });
});
