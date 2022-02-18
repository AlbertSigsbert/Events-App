import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../components/helpers/util-api";

function EventsPage(props) {
  const events = props.events;
  const router = useRouter();
  
  const findEventsHandler = (year,month) => {
    const fullPath = `events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
       <Head>
        <title>All Events</title>
        <meta name="description" content="Display various social evets"/>
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: { events: allEvents },
    revalidate: 60,
  };
}
export default EventsPage;
