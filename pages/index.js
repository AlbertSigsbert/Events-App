
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

function HomePage(props) {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <h1 className="center">Featured Events</h1>
       <EventList events={featuredEvents}/>
    </div>
  );
}
export default HomePage;
