import React, { useState, useEffect } from "react";

function Link(props) {
    const [isEnteringLink, setIsLinking] = useState(false);
    const [links, setLinks] = useState([]);
    const [currentLink, setCurrentLink] = useState("");
    const [currentName, setCurrentName] = useState("");

    useEffect(() => {
        setLinks(JSON.parse(window.localStorage.getItem("links")));
        console.log("loading");
    }, []);

    const handleIsEnteringLink = () => {};

    const handleSubmit = e => {
        e.preventDefault();
        let newLinks = links;
        if (!newLinks) {
            newLinks = [];
        }

        newLinks.push({
            link: currentLink,
            name: currentName
        });

        localStorage.setItem("links", JSON.stringify(newLinks));
        var localStorageLinks = JSON.parse(
            window.localStorage.getItem("links")
        );

        setLinks(localStorageLinks);
        setCurrentLink("");
        setCurrentName("");
        setIsLinking(false);
    };

    const removeLink = index => {
        if (!links) {
            links = [];
        }

        links.splice(index, 1);

        localStorage.setItem("links", JSON.stringify(links));
        var localStorageLinks = JSON.parse(
            window.localStorage.getItem("links")
        );

        setLinks(localStorageLinks);
    };

    const linksDisplay = links
        ? links.map((element, index) => {
              return (
                  <a href={element.link}>
                      <div className="section-item">{element.name}</div>
                  </a>
              );
          })
        : undefined;

    const addLinkContent = isEnteringLink ? (
        <form onSubmit={handleSubmit}>
            <div className="sidepanel-link-input">
                <input
                    type="text"
                    placeholder="Name"
                    value={currentName}
                    onChange={e => setCurrentName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Link"
                    value={currentLink}
                    onChange={e => setCurrentLink(e.target.value)}
                />
                <button type="submit" className="sidepanel-content-button">
                    +
                </button>
            </div>
        </form>
    ) : (
        <div className="action-button" onClick={() => setIsLinking(true)}>
            <div className="action-button-content">Add</div>
        </div>
    );

    return (
        <div className="sidepanel-content">
            <h2>Links</h2>
            {linksDisplay}
            <div style={{ display: "flex", flexDirection: "column" }} />
            {addLinkContent}
        </div>
    );
}

export default Link;
