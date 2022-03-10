import classes from "./newsletter-registration.module.css";
import { useRef, useState } from "react";
import { useContext } from "react";
import NotificationContext from "../../context/notification-context";

function NewsletterRegistration() {

  const NotificationCtx = useContext(NotificationContext);

  const emailInputRef = useRef();
  
  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;
    // optional: validate input       

    //Pending state flash message
       NotificationCtx.showNotification({
         title:'Signing up...',
         message:'Registering for newsletter.',
         status:'pending'
       })


      // send valid data to API
      fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if(response.ok){
            return response.json()
          }
          return response.json().then(data => {
            throw new Error(data.message || 'Something went wrong!');
          });
        })
        .then((data) => {
          NotificationCtx.showNotification({
            title:'Success!.',
            message:'Successfully registered for newsletter.',
            status:'success'
          })
        })
        .catch((error) => {
          NotificationCtx.showNotification({
            title:'Error!',
            message:error.message || 'Something went wrong!',
            status:'error'
          })
        });
    
    return false;
  }

  
  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Subscribe</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
