import React from "react";
import snoowrap from "snoowrap";

import RedditView from "./RedditView";
import { ThemeContext } from "../../Shared/Theme/ThemeContext";

const webColour = "rgb(64.4%, 29.1%, 29.1%)";
const dotnetColour = "rgb(34.6%, 39.5%, 64.8%)";
const generalColour = "rgb(30.6%, 60.9%, 35.9%)";
const allowedSubreddits = new Map();
allowedSubreddits.set("r/reactjs", webColour);
allowedSubreddits.set("r/programming", generalColour);
allowedSubreddits.set("r/webdev", webColour);
allowedSubreddits.set("r/learnprogramming", generalColour);
allowedSubreddits.set("r/csharp", dotnetColour);
allowedSubreddits.set("r/web_design", webColour);
allowedSubreddits.set("r/javascript", webColour);

class RedditController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            savedCategories: undefined
        };

        this.pickRandom = this.pickRandom.bind(this);
    }

    async componentDidMount() {
        if (
            process.env.REACT_APP_REDDIT_USERNAME === "" ||
            process.env.REACT_APP_REDDIT_PASSWORD === ""
        ) {
            return;
        } else {
            await this.getSavedItems(
                process.env.REACT_APP_REDDIT_USERNAME,
                process.env.REACT_APP_REDDIT_PASSWORD
            );
        }
    }

    getSavedItems = async (username, password) => {
        // Replace with actual connection to reddit.
        const r = new snoowrap({
            userAgent: "Saved Info/0.1 by Darzolak",
            clientId: process.env.REACT_APP_REDDIT_CLIENTID,
            clientSecret: process.env.REACT_APP_REDDIT_CLIENTSECRET,
            username: username,
            password: password
        });

        var hasError = false;
        var me = await r.getMe().catch(e => (hasError = true));

        if (hasError) {
            this.setState({
                isLoggedIn: false,
                errorMessage: "Username or Password was incorrect."
            });
            return;
        } else {
            this.setState({ isLoggedIn: true });
        }
        var saved = await me.getSavedContent();

        var savedCategories = new Map();
        var items = [];
        saved.forEach(element => {
            const categoryColour = allowedSubreddits.get(
                element.subreddit_name_prefixed
            );
            if (categoryColour) {
                items.push({
                    name: element.title,
                    link: element.permalink,
                    colour: categoryColour
                });
                if (!savedCategories.get(element.subreddit_name_prefixed)) {
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

        // Fetch More
        saved = await saved.fetchMore({
            skipReplies: true,
            amount: 100
        });

        savedCategories = new Map();
        items = [];
        saved.forEach(element => {
            const categoryColour = allowedSubreddits.get(
                element.subreddit_name_prefixed
            );
            if (categoryColour) {
                items.push({
                    name: element.title,
                    link: element.permalink,
                    colour: categoryColour
                });
                if (!savedCategories.get(element.subreddit_name_prefixed)) {
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
        return true;
    };

    pickRandom() {
        if (!this.state.items) {
            return;
        }

        const randomItemIndex = Math.floor(
            Math.random() * (this.state.items.length - 7)
        );
        var items = this.state.items.slice(
            randomItemIndex,
            randomItemIndex + 7
        );
        this.setState({ randomSavedItems: items });
    }

    onSubmit = e => {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;

        if (username && password) {
            this.getSavedItems(username, password);
        }
    };

    render() {
        return (
            <RedditView
                content={this.state.randomSavedItems}
                error={this.state.error}
                isLoading={this.state.items === undefined}
                pickRandom={this.pickRandom}
                isLoggedIn={this.state.isLoggedIn}
                onSubmit={this.onSubmit}
                theme={this.context}
                errorMessage={this.state.errorMessage}
            />
        );
    }
}
RedditController.contextType = ThemeContext;

export default RedditController;
