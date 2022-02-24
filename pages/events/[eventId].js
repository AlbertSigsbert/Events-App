import Head from "next/head";
import { Fragment } from "react";
import fs from "fs";
import path from "path";
import { getFeaturedEvents, getEventById } from "../../components/helpers/util-api";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Comments from "../../components/input/comments";

function EventPage(props) {
  const event = props.selectedEvent;
  const comments = props.selectedComments;
  

  if (!event) {
    <div className="center">
      <p>Loading...</p>
    </div>
  }
  return (
    <Fragment>
       <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description}/>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} comments={comments}/>
    </Fragment>
  );
}

export async function getStaticProps(context){
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);
    

  const filePath = path.join(process.cwd(), "data", "comments.json");
  const fileData = fs.readFileSync(filePath);
  const comments = JSON.parse(fileData);
  const selectedComments = comments.filter((comment) => comment.eventId === eventId);

  return {
    props:{selectedEvent:event, selectedComments},
    revalidate:30
  }
}

export async function getStaticPaths(){
  const events = await getFeaturedEvents();

  const paths = events.map(event => ({ params: {eventId: event.id} }));

  return { paths:paths, fallback:'blocking'}; 

}

export default EventPage;
