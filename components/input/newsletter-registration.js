import classes from "./newsletter-registration.module.css";
import { useRef, useState } from "react";

function NewsletterRegistration() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const emailInputRef = useRef();
  
  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value;
    // optional: validate input

      // send valid data to API
      fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsRegistered(true);
          console.log(data);
        }).catch((error) => {
          console.log(error)
          setIsInvalid(true);
        });
    
    return false;
  }

  
  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="text"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Subscribe</button>
        </div>
      </form>
      {isRegistered && (
        <div className={classes.success}>
           You have succesfully subscribed to our newsletter.
        </div>
      )}
      {isInvalid && (
        <div className={classes.error}>
           Please enter valid email address.
        </div>
      )}
    </section>
  );
}

export default NewsletterRegistration;
