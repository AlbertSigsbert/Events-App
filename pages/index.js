import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../components/helpers/util-api";
import { useEffect, useState } from "react";
import useSWR from "swr";

function HomePage(props) {

  return (
    <div>
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
