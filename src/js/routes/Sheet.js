// Case sheet class

import React, { Component } from 'react';
import ErrorBoundary from "../ErrorBoundary";
import Facts from '../sheet/Facts';


class Sheet extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render = () => {
        return (
            <div>
                <Facts clueSelections={this.props.data.playerData.clueSelections}
                    handleClueSelection={this.props.data.handleClueSelection} />
            </div>
        )
    }

}

export default Sheet;