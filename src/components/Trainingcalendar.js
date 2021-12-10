import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function Trainingcalendar() {

    const localizer = momentLocalizer(moment)

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(error => console.error(error))
    }

    const events = trainings.map((training) => {
        return {
            title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
            start: moment(training.date).toDate(),
            end: moment(training.date).add(training.duration, 'minutes').toDate(),
            resource: training.customer.firstname,
        }
    })
    console.log('events:', events);

    const initTime = new Date(new Date().setHours(12, 0, 0));
   
    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                resourceAccessor="resource"
                resourceTitleAccessor="resource"
                style={{ height: 600 }}
                defaultView={Views.WEEK}
                scrollToTime={initTime}
            />
        </div>
    )  
}