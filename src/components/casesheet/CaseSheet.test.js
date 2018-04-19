import React from "react";
import { shallow } from "enzyme";
import { CaseSheet } from "./CaseSheet";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "proptypes";

Enzyme.configure({ adapter: new Adapter() });

describe("CaseSheet", () => {
  let mountedCaseSheet;
  let store;
  let options;
  let props;

  beforeAll(() => {
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
                },
                D: {
                  address: { side: "", town: "" }
                },
                F: {
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
      playerId: 2,
      game: store.getState()
    };

    mountedCaseSheet = shallow(<CaseSheet {...props} />, options);
    console.log("CaseSheet", mountedCaseSheet.debug());
  });

  // All tests will go here
  describe("the CaseSheet", () => {
    it("always renders a div", () => {
      const field = mountedCaseSheet.find("Connect(Facts)");
      expect(field.length).toBe(1);
    });

    it("component contains everything else that gets rendered", () => {
      const divs = mountedCaseSheet.find("div");
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // Enzyme omits the outermost node when using the .children()
      // method on addressField(). This is annoying, but we can use it
      // to verify that wrappingDiv contains everything else this
      // component renders.
      expect(wrappingDiv.children()).toEqual(mountedCaseSheet.children());
    });

    it("initializes component state", () => {
      expect(mountedCaseSheet.state()).toMatchObject({locationKeys:["C", "D", "F"], playerId:2});
    });
  });
});
