import Head from "next/head";

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../components/helpers/util-api";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>AM Events</title>
        <meta name="description" content="Display various social evets"/>
      </Head>
      <h1 className="center">Featured Events</h1>
      <EventList events={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { events: featuredEvents },
    revalidate: 1800,
  };
}
export default HomePage;
