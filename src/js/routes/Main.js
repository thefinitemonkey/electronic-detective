// Main content area class


import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Suspects from "./Suspects";


class Main extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }


    render = () => {
        const extraProps = this.props;
        return (
            <Switch>
                <Route exact path='/suspects' render={(props) => (
                    <Suspects {...props} data={extraProps} />
                )} />
            </Switch>
        )
    }

}

export default Main;