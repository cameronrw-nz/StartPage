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
        var marginLeft = "-380px";
        if (this.state.isExpanded === true) {
            marginLeft = "0px";
        }

        return (
            <div>
                <div className="sidepanel" style={{marginLeft: marginLeft}}>
                    <div className="sidepanel-expander" onClick={this.handleExpand} />
                    <RedditController />
                </div>
            </div>
        )
    }
}

export default SidePanelController;