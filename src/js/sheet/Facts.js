// Case sheet Facts class

import React, { Component } from 'react';
import ErrorBoundary from "../ErrorBoundary";


class Facts extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = Object.assign({}, props.clueSelections);
    }

    componentWillReceiveProps(props) {
        this.props = props;
        const obj = Object.assign({}, props.clueSelections);
        this.setState(obj);
    }

    handleClueSelection = (e, prop, data) => {
        // Prevent the default behavior and send the action up the chain
        //e.preventDefault();
        this.props.handleClueSelection(e, prop, data);
        /*
        const obj = Object.assign({}, this.state);
        obj[prop] = data;
        this.setState(obj);
        */
    }

    render = () => {
        return (
            <div>
                <div>
                    <h3>Sex of the murderer</h3>
                    <input type="radio" id="genderMale" name="sex" value="male"
                        onChange={((e) => this.handleClueSelection(e, 'sex', 'male'))} 
                        checked={this.props.clueSelections.sex==="male"} />
                    <label for="genderMale">Male</label>
                    <input type="radio" id="genderFemale" name="sex" value="female"
                        onChange={((e) => this.handleClueSelection(e, 'sex', 'female'))}
                        checked={this.props.clueSelections.sex==="female"} />
                    <label for="genderFemale">Female</label>
                </div>
                <div>
                    <h3>Where the murderer went</h3>
                    <input type="radio" id="sideWest" name="side" value="west"
                        onChange={((e) => this.handleClueSelection(e, 'side', 'west'))}
                        checked={this.props.clueSelections.side==="west"} />
                    <label for="sideWest">West</label>
                    <input type="radio" id="sideEast" name="side" value="east"
                        onChange={((e) => this.handleClueSelection(e, 'side', 'east'))}
                        checked={this.props.clueSelections.side==="east"} />
                    <label for="sideEast">East</label>
                </div>
            </div>
        )
    }


}

export default Facts;