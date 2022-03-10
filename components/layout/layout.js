import { Fragment } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
import { useContext } from "react";
import NotificationContext from "../../context/notification-context";

function Layout(props) {
  const NotificationCtx = useContext(NotificationContext);

  const activeNotification = NotificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
