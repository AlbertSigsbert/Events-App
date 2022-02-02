import Link from "next/link";
import classes from "./main-header.module.css";

function MainHeader(props) {
  const { header, logo, navigation } = classes;
  return (
    <header className={header}>
      <div className={logo}>
        <Link href="/">AM Events</Link>
      </div>
      <nav className={navigation}>
        <ul>
          <li>
            <Link href="/events">All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
