import React, {PureComponent} from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {connect} from "react-redux";

class Interrogation extends PureComponent {
    render = () => {
        return (
            <div>
                Interrogation screen
            </div>
        );
    }
}

function mapStateToProps(game) {
    return {game};
}

export default connect(mapStateToProps)(Interrogation);