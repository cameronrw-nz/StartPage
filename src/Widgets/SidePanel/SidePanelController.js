import React from "react";

import RedditController from "./RedditController";

class SidePanelController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        }

        this.handleExpand = this.handleExpand.bind(this);
    }

    handleExpand() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }

    render() {
        var width = "0px";
        if (this.state.isExpanded === true) {
            width = "400px";
        }

        return (
            <div>
                <div className="sidepanel-expander" onClick={this.handleExpand}>
                    Open
                </div>
                <div className="sidepanel" style={{width: width}}>
                    <RedditController />
                </div>
            </div>
        )
    }
}

export default SidePanelController;