import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

export default function Statistics() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data.map(data => ({
            activity: data.activity,
            duration: data.duration
        }))))
        .catch(error => console.error(error))
    }

    const chart = _(trainings)
    .groupBy(content => content.activity)
    .map((value, key)=> ({
        activity: key,
        minutes: _.sumBy(value, 'duration')
    }))
    .value()
    console.log(trainings);

    return(
        <div>
            <ResponsiveContainer width="100%" aspect={2.5}>
              <BarChart data={chart}>
                <XAxis dataKey="activity" />
                <YAxis label={{value: 'Time (minutes)', angle: -90, position: 'insideLeft'}}/>
                <Bar dataKey="minutes" barsize={50} fill="#AED6F1" />
              </BarChart> 
            </ResponsiveContainer>
        </div>
    );
}