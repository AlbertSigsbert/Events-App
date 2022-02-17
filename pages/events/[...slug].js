import { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../components/helpers/util-api";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventPage(props) {
  // const router = useRouter();
  // const filteredData = router.query.slug;


 if(props.hasError){
  return(
    <Fragment>
      <ErrorAlert>
        <p>Invalid filter. Please adjust your values.</p>
      </ErrorAlert>
      <div className="center">
        <Button link="/events">All Events</Button>
      </div>
    </Fragment>
  );
 }

  const filteredEvents =  props.events;
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context){
  
  const {params} = context;

  const filteredData = params.slug;
  
  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props:{hasError:true}
    }
  }

  const filteredEvents =  await getFilteredEvents({ year: numYear, month: numMonth });

  return { props: { events: filteredEvents, date: { year: numYear, month: numMonth }}};




}
export default FilteredEventPage;
