import React, { PureComponent } from "react";
import Dialog, {DialogTitle} from "material-ui/Dialog";
import Button from "material-ui/Button";
import { body, bodyStrong } from "../utils/globalcss";

class RulesDialog extends PureComponent {
  state = {
    dialogOpen: this.props.dialogOpen
  };

  componentWillReceiveProps = props => {
      console.log("Received props", props);
    this.setState({ dialogOpen: props.dialogOpen || false });
  };

  handleDialogOpen = () => {
    this.props.handleDialogOpen();
  };

  handleDialogClose = () => {
    this.props.handleDialogClose();
  };

  render = () => {
    const actions = [
      <Button variant="raised" label="Close" primary={true} onClick={this.handleDialogClose} />
    ];

    return (
      <div>
        <Dialog
          title="Electronic Detective Rules"
          actions={actions}
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
        >
        <DialogTitle>Things to Know</DialogTitle>
          <div>
            <div className={body}>
              <ul>
                <li>Only one murderer</li>
                <li>Only one victim</li>
                <li>One two four players</li>
                <li>
                  The murderer will <span className={bodyStrong}>never</span> be where a weapon has been dumped
                </li>
                <li>
                  No clues will ever be found at the crime scene (nobody said
                  these rules made complete sense)
                </li>
                <li>
                  Everybody answers questions honestly, even the murderer, with
                  one exception
                </li>
                <li>
                  Only a suspect of the <span className={bodyStrong}>same gender as the killer</span> is guaranteed
                  to tell the truth about the fingerprints on the murder weapon
                  (really, nobody said these rules made complete sense)
                </li>
                <li>If you guess wrong about the murderer, you're out</li>
                <li>First person to correctly identify the murderer wins</li>
                <li>
                  Everyone gets to know what a suspect says in their initial
                  statement. Questioning a suspect is private.
                </li>
              </ul>
            </div>
          </div>
        </Dialog>
      </div>
    );
  };
}

export default RulesDialog;
