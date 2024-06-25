import React from 'react'
import "./event.css";

type Props = {
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    location: string
}

const EventCard = (props: Props) => {
    return (
        <div id="event-Card" className="col-6 m-2">
            <h4 className="text-center"><b>{props.name}</b></h4>
            <br/>
            <b>Start date:</b><i className='mx-2'>{props.startDate}</i>
            <br/>
            <b>End date:</b><i className='mx-2'>{props.endDate}</i>
            <br/><br/>
            <p><b>Description: </b>{props.description}</p>
            <small><b>Location:</b>{props.location}</small>
        </div>
    )
}

export default EventCard