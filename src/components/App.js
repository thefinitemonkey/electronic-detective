import React, { Component } from "react";
import Loader from "./Loader";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  state = { screen: "loading" };

  render = () => {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Loader />
        </MuiThemeProvider>
      </div>
    );
  };
}

export default App;
