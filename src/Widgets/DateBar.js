import React from 'react'

class DateBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date().toLocaleString('en-GB', {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'}),
            time: new Date().toLocaleTimeString('it-IT')
        };
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ 
            date: new Date().toLocaleString('en-GB', {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'}),
            time: new Date().toLocaleTimeString('it-IT')
         }), 1000);
      }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        return (
            <div className="date">
                <div className="date-time">
                    {this.state.time}
                </div>
                <div className="date-formatted">
                    {this.state.date}
                </div>
            </div>
          );
    }
}

export default DateBar