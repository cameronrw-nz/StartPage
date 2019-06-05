import React from "react";
import snoowrap from "snoowrap";

import RedditView from "./RedditView";
import { ThemeContext } from "../../Shared/Theme/ThemeContext";

const webColour = "rgb(64.4%, 29.1%, 29.1%)";
const dotnetColour = "rgb(34.6%, 39.5%, 64.8%)";
const generalProgrammingColour = "rgb(30.6%, 60.9%, 35.9%)";
const generalColour = "rgb(53%, 38.9%, 50.9%)";
const allowedSubreddits = new Map();
allowedSubreddits.set("r/reactjs", webColour);
allowedSubreddits.set("r/programming", generalProgrammingColour);
allowedSubreddits.set("r/webdev", webColour);
allowedSubreddits.set("r/learnprogramming", generalProgrammingColour);
allowedSubreddits.set("r/csharp", dotnetColour);
allowedSubreddits.set("r/web_design", webColour);
allowedSubreddits.set("r/javascript", webColour);

const availableSubreddits = [
    { value: "r/reactjs", label: "r/reactjs" },
    { value: "r/programming", label: "r/programming" },
    { value: "r/webdev", label: "r/webdev" },
    { value: "r/learnprogramming", label: "r/learnprogramming" },
    { value: "r/csharp", label: "r/csharp" },
    { value: "r/web_design", label: "r/web_design" },
    { value: "r/javascript", label: "r/javascript" }
];

class RedditController extends React.Component {
    constructor(props) {
        super(props);

        const initialChosenSubredditsJson = window.localStorage.getItem(
            "subreddits"
        );
        const initialChosenSubreddits = initialChosenSubredditsJson
            ? JSON.parse(initialChosenSubredditsJson)
            : availableSubreddits;

        this.state = {
            savedCategories: undefined,
            availableSubreddits: availableSubreddits,
            chosenSubreddits: initialChosenSubreddits,
            isChoosingSubreddits: false
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

    toggleChoosingSubreddits = () => {
        this.setState({
            isChoosingSubreddits: !this.state.isChoosingSubreddits
        });
    };

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

        var items = [];
        let chosenSubredditItems = [];
        saved.forEach(element => {
            const categoryColour =
                allowedSubreddits.get(element.subreddit_name_prefixed) ||
                generalColour;
            items.push({
                name: element.title,
                link: element.permalink,
                colour: categoryColour,
                urlPrefix: element.subreddit_name_prefixed
            });
            if (
                this.state.chosenSubreddits.find(
                    subreddit =>
                        subreddit.value === element.subreddit_name_prefixed
                )
            ) {
                chosenSubredditItems.push({
                    name: element.title,
                    link: element.permalink,
                    colour: categoryColour
                });
            }
        });

        this.setState({ items, chosenSubredditItems });
        this.pickRandom(chosenSubredditItems);

        // Fetch More
        saved = await saved.fetchMore({
            skipReplies: true,
            amount: 100
        });

        items = [];
        chosenSubredditItems = [];
        saved.forEach(element => {
            const categoryColour =
                allowedSubreddits.get(element.subreddit_name_prefixed) ||
                generalColour;
            items.push({
                name: element.title,
                link: element.permalink,
                colour: categoryColour,
                urlPrefix: element.subreddit_name_prefixed
            });
            if (
                this.state.chosenSubreddits.find(
                    subreddit =>
                        subreddit.value === element.subreddit_name_prefixed
                )
            ) {
                chosenSubredditItems.push({
                    name: element.title,
                    link: element.permalink,
                    colour: categoryColour
                });
            }
        });
        this.setState({ items, chosenSubredditItems });
        return true;
    };

    pickRandom(chosenSubredditItems) {
        if (!chosenSubredditItems) {
            return;
        }

        let randomSavedItems;
        if (chosenSubredditItems.length > 7) {
            const randomItemIndex = Math.floor(
                Math.random() * (chosenSubredditItems.length - 7)
            );
            randomSavedItems = chosenSubredditItems.slice(
                randomItemIndex,
                randomItemIndex + 7
            );
        } else {
            randomSavedItems = chosenSubredditItems;
        }

        this.setState({ randomSavedItems });
    }

    onSubmit = e => {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;

        if (username && password) {
            this.getSavedItems(username, password);
        }
    };

    onSubredditChange = chosenSubreddits => {
        const chosenSubredditItems = [];
        this.state.items &&
            this.state.items.forEach(item => {
                if (
                    !chosenSubreddits ||
                    chosenSubreddits.length === 0 ||
                    chosenSubreddits.find(
                        subreddit => subreddit.value === item.urlPrefix
                    )
                ) {
                    chosenSubredditItems.push(item);
                }
            });
        this.setState({ chosenSubreddits, chosenSubredditItems });
        this.pickRandom(chosenSubredditItems);

        localStorage.setItem("subreddits", JSON.stringify(chosenSubreddits));
    };

    render() {
        return (
            <RedditView
                content={this.state.randomSavedItems}
                error={this.state.error}
                isLoading={this.state.items === undefined}
                pickRandom={() =>
                    this.pickRandom(this.state.chosenSubredditItems)
                }
                isLoggedIn={this.state.isLoggedIn}
                onSubmit={this.onSubmit}
                theme={this.context}
                errorMessage={this.state.errorMessage}
                availableSubreddits={this.state.availableSubreddits}
                chosenSubreddits={this.state.chosenSubreddits}
                onSubredditChange={this.onSubredditChange}
                isChoosingSubreddits={this.state.isChoosingSubreddits}
                toggleChoosingSubreddits={this.toggleChoosingSubreddits}
            />
        );
    }
}
RedditController.contextType = ThemeContext;

export default RedditController;
