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
                <Icon url="https://outlook.live.com/mail/inbox" logo={EmailLogo} />
                <Icon url="https://github.com/cameronrw-nz" logo={GitHubLogo} />
                <Icon url="http://maps.google.com" logo={GoogleMaps} />
                <Icon url="https://reddit.com" logo={RedditLogo} />
                <Icon url="https://www.twitch.tv/directory" logo={TwitchLogo} />
                <Icon url="https://youtube.com" logo={YoutubeLogo} />
            </div>
        )
    }
}

function Icon(props) {
    return (
        <a href={props.url}>
            <img src={props.logo} className="icon-bar-icon" alt="logo" />
        </a>
    )
}

export default IconBar