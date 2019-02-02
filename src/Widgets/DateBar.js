import React from 'react'
import moment from 'moment-timezone'

class DateBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateTime: new Date(),
        };
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ 
            dateTime: new Date(),
         }), 1000);
      }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        var localDate = this.state.dateTime.toLocaleString('th-TH', {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'});
        var localTime = this.state.dateTime.toLocaleTimeString('it-IT');
        var nzTime = moment(this.state.dateTime.toString()).tz('NZ').format('HH:mm:ss');
        var nzDate = moment(this.state.dateTime.toString()).tz('NZ').format('ddd, D MMMM YYYY');

        return (
            <div className="date-block">
                <DateBlock timeZone="Bangkok, Thailand" time={localTime} date={localDate} />
                <DateBlock timeZone="Christchurch, New Zealand" time={nzTime} date={nzDate} />
            </div>
          );
    }
}

function DateBlock({ timeZone, time, date }) {
    return (
        <React.Fragment>
            <div className="date">
                <div className="date-time">
                    {time}
                </div>
                <div className="date-formatted">
                    {date}
                </div>
                <div className="date-formatted">
                    {timeZone}
                </div>
            </div>
        </React.Fragment>
    )
}

export default DateBar