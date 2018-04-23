import React from "react";
import { shallow } from "enzyme";
import Statements from "./Statements";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "proptypes";
import { testStore } from "../../utils/teststore_alt";
import configureMockStore from "redux-mock-store";

Enzyme.configure({ adapter: new Adapter() });

describe("Statements", () => {
  let mountedStatements;
  let store;
  let options;
  let props;
  const mockStore = configureMockStore();

  beforeAll(() => {
    store = mockStore(testStore);

    options = {
      context: { store },
      childContextTypes: { store: PropTypes.object.isRequired }
    };

    props = {
      playerId: 2
    };

    mountedStatements = shallow(<Statements {...props} />, options);
  });

  afterAll(() => {
    //materialMount.cleanUp();
  });

  // All tests will go here
  describe("the Statements", () => {
    it("always renders single Statements element", () => {
        expect(mountedStatements.find("Statements").length).toBe(1);
    });

    it("component contains everything else that gets rendered", () => {
      const divs = mountedStatements.find("Statements");
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // Enzyme omits the outermost node when using the .children()
      // method on addressField(). This is annoying, but we can use it
      // to verify that wrappingDiv contains everything else this
      // component renders.
      expect(wrappingDiv.children()).toEqual(mountedStatements.children());
    });
  });
});
