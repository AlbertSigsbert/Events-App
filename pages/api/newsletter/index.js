import { connectDatabase, insertDocument} from "../../../components/helpers/util-db";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: "Invalid Email Address" });
      return;
    }

    let client;

    try {
       client = await connectDatabase();
    } catch (error) {
      res.status(500).json({message:'Failed to connect to the Database.'});
      return;
    }
   
    try {
      await insertDocument(client,'newsletter',{email:userEmail});
      client.close();

    } catch (error) {
      res.status(500).json({message:'Failed to insert data.'});
      return;
    }
    res.status(201).json({ message: "Succesfully Registered" });
  }
  
}

export default handler;
