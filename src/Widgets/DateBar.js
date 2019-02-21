import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment-timezone'

function DateBar() {
    const [dateTime, setDateTime] = useState(new Date());
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(() => setDateTime(new Date()), 1000);

         return function cleanup() {
             clearInterval(intervalRef.current);
         }
    });

    var localDate = dateTime.toLocaleString('th-TH', {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'});
    var localTime = dateTime.toLocaleTimeString('it-IT');
    var nzTime = moment(dateTime.toString()).tz('NZ').format('HH:mm:ss');
    var nzDate = moment(dateTime.toString()).tz('NZ').format('ddd, D MMMM YYYY');

    return (
        <div className="date-block">
            <DateBlock timeZone="Bangkok, Thailand" time={localTime} date={localDate} />
            <DateBlock timeZone="Christchurch, New Zealand" time={nzTime} date={nzDate} />
        </div>
    );
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