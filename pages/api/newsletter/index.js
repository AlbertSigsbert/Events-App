function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    if (!validateEmail(userEmail)) {
      res.status(422).json({ message: "Invalid Email Address" });
      return;
    }

    console.log(userEmail);
    res.status(201).json({ message: "Succesfully Registered" });
  }
  
}

export default handler;
