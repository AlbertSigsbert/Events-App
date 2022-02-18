import Image from "next/image";
import Button from "../ui/button";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
import classes from "./event-item.module.css";

function EventItem({ event }) {
 
  const { id, image, title, date, location } = event;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `events/${id}`;
  
  const {item,content,summary,address,actions,icon} = classes;
  return (
    <li className={item}>
      <Image src={"/" + image} alt={title} width={250} height={160}/>
      <div className={content}>
        <div className={summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon/>
            <time>{humanReadableDate}</time>
          </div>
          <div className={address}>
            <AddressIcon/>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={actions}>
          
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={icon}>
              <ArrowRightIcon/>
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
