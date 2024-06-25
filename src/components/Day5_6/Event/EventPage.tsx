import axios from 'axios'
import React, { useState, useEffect } from 'react'
import EventCard from './EventCard'
import Loader from '../../CommonComponent/Loader'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

type Props = {}
type eventType = {
    id: string,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    location: string
}
type events = [eventType]

const EventPage = (props: Props) => {
    const [event, setEvent] = useState<events | []>([]);
    const [isLoading, setIsLoading] = useState(false);
    const getEventData = async () => {
        try {
            setIsLoading(true);
            const eventData = await axios.get("http://localhost:3001/events");
            setEvent(eventData.data);
            toast.success("Data recieved successfully");
        } catch (e) {
            toast.error("Service unavailable");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getEventData();
    }, [])
    return (
        <>
            <h1 id="eventHeading">Events</h1>
            <Toaster position="top-center" reverseOrder={false}/>
            <div id="eventCardArea" className='row'>
                {isLoading && (<Loader />)}
                {
                    event.map((item, index) => (
                        <EventCard name={item.name} startDate={item.startDate} endDate={item.endDate} description={item.description} location={item.description} key={item.id} />
                    ))
                }
            </div>
            <button className='btn btn-primary' style={{marginLeft:"70%",marginBottom:"10%"}}>
                <Link to="/day5_6/stopWatch"> stop watch </Link> 
            </button>
        </>
    )
}
export default EventPage