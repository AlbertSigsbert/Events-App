import EventItem from "./event-item";
import classes from "./event-list.module.css";

function EventList({ events }) {
  const { list } = classes;
  return (
    <ul className={list}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
