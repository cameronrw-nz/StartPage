import React from "react";

class Link extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            links: undefined
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    componentDidMount() {
        var links = JSON.parse(window.localStorage.getItem("links"));

        this.setState({links});
    }

    handleSubmit() {
        var links = this.state.links;
        if (!links) {
            links = []
        }

        links.push({ link: this.state.currentLink, name: this.state.currentName });

        localStorage.setItem("links", JSON.stringify(links));
        var localStorageLinks = JSON.parse(window.localStorage.getItem("links"));

        this.setState({
            links: localStorageLinks,
            currentLink: "",
            currentName: ""
        });
    }

    handleLinkChange(e) {
        this.setState({currentLink: e.target.value});
    }

    handleNameChange(e) {
        this.setState({currentName: e.target.value});
    }

    removeLink(index) {
        var links = this.state.links;
        if (!links) {
            links = []
        }

        links.splice(index, 1);

        localStorage.setItem("links", JSON.stringify(links));
        var localStorageLinks = JSON.parse(window.localStorage.getItem("links"));

        this.setState({
            links: localStorageLinks,
        });
    }

    render() {
        return (
            <div className="sidepanel-content">
                <h2>Links</h2>
                <div className="sidepanel-link-input">
                    <input type="text" placeholder="Name" value={this.state.currentName} onInput={this.handleNameChange} />
                    <input type="text" placeholder="Link" value={this.state.currentLink} onInput={this.handleLinkChange} />
                    <div className="sidepanel-content-button" onClick={this.handleSubmit}>
                        +
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    {this.state.links 
                        ? this.state.links.map((element, index) => {
                            return (
                                <div style={{display: "flex", width: "100%"}} >
                                    <div className="reddit-content">
                                        <a href={element.link}>
                                            {element.name}
                                        </a>
                                    </div>
                                    <div 
                                        className="sidepanel-content-link-button"
                                        onClick={() => this.removeLink(index)}>
                                        -
                                    </div>
                                </div>
                            )
                        })
                        : null}
                </div>
            </div>
        )
    }
}

export default Link;