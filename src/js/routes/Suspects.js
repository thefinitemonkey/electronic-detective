// Suspects route

import React, { Component } from 'react';
import Characters from '../characters/Characters';


class Suspects extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }


    render = () => {
        return (
            <div>
                <h2>We are the suspects</h2>
                <Characters charactersData={this.props.data.charactersData} murdererData={this.props.data.murdererData}
                    weaponsData={this.props.data.weaponsData} locationsData={this.props.data.locationsData}
                    handleAccusationClick={this.props.data.handleAccusationClick} />
            </div>
        )
    }
}

export default Suspects;