import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../dummy-data";

function EventsPage(props) {
  const events = getAllEvents();
  const router = useRouter();
  
  const findEventsHandler = (year,month)=> {
    const fullPath = `events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </Fragment>
  );
}

export default EventsPage;
