import React from 'react'

import EmailLogo from '../Icons/email.svg'
import GitHubLogo from '../Icons/github.svg'
import GoogleMaps from '../Icons/map.svg'
import RedditLogo from '../Icons/reddit.svg'
import TwitchLogo from '../Icons/twitch.svg'
import YoutubeLogo from '../Icons/youtube.svg'

class IconBar extends React.Component {
    render() {
        return (
            <div className="icon-bar">
                <a href="https://outlook.live.com/mail/inbox">
                    <img src={EmailLogo} className="icon-bar-icon" alt="logo" />
                </a>
                <a href="https://github.com">
                    <img src={GitHubLogo} className="icon-bar-icon" alt="logo" />
                </a>
                <a href="http://maps.google.com">
                    <img src={GoogleMaps} className="icon-bar-icon" alt="logo" />
                </a>
                <a href="https://reddit.com">
                    <img src={RedditLogo} className="icon-bar-icon" alt="logo" />
                </a>
                <a href="https://www.twitch.tv/directory">
                    <img src={TwitchLogo} className="icon-bar-icon" alt="logo" />
                </a>
                <a href="https://youtube.com">
                    <img src={YoutubeLogo} className="icon-bar-icon" alt="logo" />
                </a>
            </div>
        )
    }
}

export default IconBar