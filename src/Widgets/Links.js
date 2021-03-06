import React, { useState, useEffect } from "react";

import EditIcon from "../Shared/Icons/edit.svg";

function Link(props) {
    const [links, setLinks] = useState([]);
    const [currentLink, setCurrentLink] = useState("");
    const [currentName, setCurrentName] = useState("");
    const [isAddingLinks, setIsAddingLinks] = useState(false);

    useEffect(() => {
        setLinks(JSON.parse(window.localStorage.getItem("links")));
        console.log("loading");
    }, []);

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
    };

    const removeLink = (e, index) => {
        e.preventDefault();
        let newLinks = links;
        if (!newLinks) {
            newLinks = [];
        }

        newLinks.splice(index, 1);

        localStorage.setItem("links", JSON.stringify(newLinks));
        var localStorageLinks = JSON.parse(
            window.localStorage.getItem("links")
        );

        setLinks(localStorageLinks);
    };

    const linksDisplay = links
        ? links.map((element, index) => {
              return (
                  <a key="index" href={element.link}>
                      <div
                          className="section-item"
                          style={{
                              color: props.theme.staticText,
                              borderColor: props.theme.border,
                              backgroundColor: props.theme.boxBackground
                          }}
                      >
                          <div className="section-item-content">
                              {element.name}
                          </div>
                          <div
                              className="section-item-action"
                              onClick={e => removeLink(e, index)}
                          >
                              -
                          </div>
                      </div>
                  </a>
              );
          })
        : undefined;

    const addLinkContent = isAddingLinks ? (
        <form onSubmit={handleSubmit}>
            <div className="sidepanel-link-input">
                <input
                    type="text"
                    onChange={e => setCurrentName(e.target.value)}
                    placeholder="Name"
                    value={currentName}
                    style={{
                        marginRight: "4px",
                        borderColor: props.theme.border,
                        background: props.theme.boxBackground,
                        color: props.theme.dynamicText
                    }}
                />
                <input
                    type="text"
                    onChange={e => setCurrentLink(e.target.value)}
                    placeholder="Link"
                    value={currentLink}
                    style={{
                        marginRight: "4px",
                        borderColor: props.theme.border,
                        background: props.theme.boxBackground,
                        color: props.theme.dynamicText
                    }}
                />
                <button
                    type="submit"
                    className="sidepanel-content-button"
                    style={{
                        borderColor: props.theme.border,
                        background: props.theme.boxBackground,
                        color: props.theme.dynamicText
                    }}
                >
                    +
                </button>
            </div>
        </form>
    ) : (
        undefined
    );

    return (
        <div className="sidepanel-content">
            <h2 style={{ color: props.theme.staticText }}>
                Links{" "}
                <img
                    src={EditIcon}
                    alt="Edit Links"
                    onClick={() => setIsAddingLinks(!isAddingLinks)}
                />
            </h2>
            {addLinkContent}
            {linksDisplay}
        </div>
    );
}

export default Link;
