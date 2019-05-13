import React from "react";
import snoowrap from "snoowrap";

import RedditView from "./RedditView";

const allowedSubreddits = [
    "r/reactjs",
    "r/programming",
    "r/csharp",
    "r/web_design",
    "r/javascript"
];

class RedditController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            savedCategories: undefined
        };

        this.pickRandom = this.pickRandom.bind(this);
    }

    async componentDidMount() {
        // Replace with actual connection to reddit.
        const r = new snoowrap({
            userAgent: "Saved Info/0.1 by Darzolak",
            clientId: process.env.REACT_APP_REDDIT_CLIENTID,
            clientSecret: process.env.REACT_APP_REDDIT_CLIENTSECRET,
            username: process.env.REACT_APP_REDDIT_USERNAME,
            password: process.env.REACT_APP_REDDIT_PASSWORD
        });

        var me = await r.getMe();
        var saved = await me.getSavedContent().fetchAll();

        var savedCategories = new Map();
        var items = [];
        saved.forEach(element => {
            if (
                allowedSubreddits.find(
                    name => name === element.subreddit_name_prefixed
                )
            ) {
                items.push({ name: element.title, link: element.permalink });
                if (
                    savedCategories.get(element.subreddit_name_prefixed) ===
                    undefined
                ) {
                    savedCategories.set(element.subreddit_name_prefixed, [
                        { name: element.title, permalink: element.permalink }
                    ]);
                } else {
                    savedCategories.get(element.subreddit_name_prefixed).push({
                        name: element.title,
                        permalink: element.permalink
                    });
                }
            }
        });

        this.setState({ items });
        this.pickRandom();
    }

    pickRandom() {
        if (!this.state.items) {
            return;
        }

        const randomItemIndex = Math.floor(
            Math.random() * (this.state.items.length - 5)
        );
        var items = this.state.items.slice(
            randomItemIndex,
            randomItemIndex + 5
        );
        this.setState({ randomSavedItems: items });
    }

    render() {
        return (
            <RedditView
                content={this.state.randomSavedItems}
                isLoading={this.state.items === undefined}
                pickRandom={this.pickRandom}
            />
        );
    }
}

export default RedditController;
